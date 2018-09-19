open Infix_Utilities;
open ReduxObservable.Store;
open ReduxObservable.Dependencies;

exception NoHashFound;
exception NoResponseData;

[@bs.deriving abstract]
type approveArticlePayload = {
  article_id: string,
  article_version: int,
  category: string,
  content_hash: string,
  request_id: option(string),
  user_id: string,
};

[@bs.deriving abstract]
type reduxAction = {
  [@bs.as "type"]
  type_: string,
};

[@bs.deriving abstract]
type approveArticleAction = {
  [@bs.as "type"]
  type_: string,
  payload: approveArticlePayload,
};

let approveArticleAction =
    (payload: approveArticlePayload): approveArticleAction =>
  approveArticleAction(~type_="APPROVE_ARTICLE", ~payload);

type generateApproveArticleHashPayload = {
  id: string,
  version: int,
  content_hash: string,
  category: string,
  request_id: string,
  contributor: string,
};

[@bs.module "../../../lib/generate-publish-article-hash.js"]
/* (id, version, content_hash, category, request_id, contributor) => "" */
external _generateApproveArticleHash:
  (string, int, string, string, string, string) => string =
  "default";

type generateApproveArticlePayload = {
  id: string,
  version: int,
  content_hash: string,
  category: string,
  request_id: string,
  user_id: string,
};

let generateApproveArticleHash =
    (
      {id, version, content_hash, category, request_id, user_id}: generateApproveArticlePayload,
    ) =>
  _generateApproveArticleHash(
    id,
    version,
    content_hash,
    category,
    request_id,
    user_id,
  );

let approveArticleEpic =
    (action: approveArticleAction, _store: store, dependencies: dependencies) =>
  ReduxObservable.Observable.(
    action
    ->(ofType("APPROVE_ARTICLE"))
    ->(
        switchMap(action => {
          let apolloClient = dependencies->apolloClientGet;
          let subscriber = dependencies->subscribeToOffchainEvent;
          let personalSign = dependencies->personalSignGet;

          let resourceID = action->payloadGet->article_idGet;
          let article_version = action->payloadGet->article_versionGet;
          let category = action->payloadGet->categoryGet;
          let content_hash = action->payloadGet->content_hashGet;
          let request_id =
            switch (action->payloadGet->request_idGet) {
            | Some(request_id) => request_id
            | None => ""
            };
          let user_id = action->payloadGet->user_idGet;
          /* let resourceID = "a38f4088c7c04e449644d6f25e28bd49";
             let article_version = 1;
             let category = "kauri";
             let user_id = "0xf8ae578d5d4e570de6c31f26d42ef369c320ae0b";
             let content_hash = "QmZpfbd67BNumh5gJnp7jeXNz443V4rDvYsDssDKREtFgq"; */

          /* (id, version, content_hash, category, request_id, contributor) => "" */
          let approveArticleHash =
            generateApproveArticleHash({
              id: resourceID,
              version: article_version,
              content_hash,
              category,
              request_id,
              user_id,
            });

          fromPromise(personalSign(approveArticleHash))
          ->(
              mergeMap(signature => {
                let approveArticleMutation =
                  Article_Queries.ApproveArticle.make(
                    ~article_id=resourceID,
                    ~version=article_version,
                    ~signature,
                    (),
                  );

                let approveArticleMutationMethod = {
                  "mutation": Article_Queries.ApproveArticleMutation.graphqlMutationAST,
                  "variables": approveArticleMutation##variables,
                  "fetchPolicy": Js.Nullable.undefined,
                };

                fromPromise(
                  apolloClient##mutate(approveArticleMutationMethod),
                );
              })
            )
          ->(
              map(response => {
                let possibleResponse = Js.Nullable.toOption(response##data);
                switch (possibleResponse) {
                | Some(data) =>
                  let result = Article_Queries.ApproveArticle.parse(data);
                  switch (result##approveArticle |? (x => x##hash)) {
                  | Some(hash) => hash
                  | None => raise(NoHashFound)
                  };
                | _ => raise(NoResponseData)
                };
              })
            )
          ->(flatMap(hash => fromPromise(subscriber(hash))))
          ->(tap(_ => apolloClient##resetStore()))
          ->(
              map(
                (
                  offchainEventResponse: ReduxObservable.Dependencies.OffchainEvent.response,
                ) =>
                ReduxObservable.Dependencies.OffchainEvent.(
                  dataGet(offchainEventResponse)
                  ->submitArticleResponseGet
                  ->versionGet
                )
              )
            )
          ->(
              flatMap(_ => {
                let trackApproveArticlePayload =
                  App_Module.trackMixPanelPayload(
                    ~event="Offchain",
                    ~metaData=
                      App_Module.trackMixPanelMetaData(
                        ~resource="article",
                        ~resourceID,
                        ~resourceVersion=string_of_int(article_version),
                        ~resourceAction="approve article",
                      ),
                  );
                let trackApproveArticleAction =
                  App_Module.trackMixPanelAction(trackApproveArticlePayload);

                let notificationType =
                  App_Module.notificationTypeToJs(`Success);
                let showApproveArticleNotificationPayload =
                  App_Module.showNotificationPayload(
                    ~notificationType,
                    ~message="Article approved",
                    ~description=
                      "This approved article now needs to be published by the author",
                  );

                let showApproveArticleNotificationAction =
                  App_Module.showNotificationAction(
                    showApproveArticleNotificationPayload,
                  );

                of3(
                  trackApproveArticleAction,
                  showApproveArticleNotificationAction,
                  App_Module.routeChangeAction(
                    App_Module.route(
                      ~slug1=ArticleId(resourceID),
                      ~slug2=ArticleVersionId(article_version),
                      ~routeType=ArticleApproved,
                    ),
                  ),
                );
              })
            )
          ->(
              catch(err => {
                Js.log(err);
                of1(App_Module.(showErrorNotificationAction(err)));
              })
            );
        })
      )
  );