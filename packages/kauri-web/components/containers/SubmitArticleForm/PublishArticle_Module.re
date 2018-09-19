open Infix_Utilities;

exception NoHashFound;
exception NoResponseData;

/* (content_hash) => "" */
[@bs.module "../../../lib/generate-publish-article-hash.js"]
external convertIpfsHash: string => string = "convertIpfsHash";

[@bs.module "../../../lib/generate-publish-article-hash.js"]
external _generatePublishArticleHash:
  (string, int, string, string, string) => string =
  "default";

module PublishArticle = {
  let actionType = "PUBLISH_ARTICLE";

  type ownerPayload = {
    .
    "type": option([ | `ARTICLE]),
    "id": option(string),
    "version": option(int),
  };

  [@bs.deriving abstract]
  type payload = {
    id: string,
    version: int,
    contentHash: string,
    dateCreated: string,
    contributor: string,
    owner: Js.Nullable.t(ownerPayload),
  };

  [@bs.deriving abstract]
  type action = {
    [@bs.as "type"]
    type_: string,
    payload,
  };

  let generatePublishArticleHash =
      (~id, ~version, ~contentHash, ~contributor, ~dateCreated): string =>
    _generatePublishArticleHash(
      id,
      version,
      contentHash,
      contributor,
      dateCreated,
    );
};

let publishArticleAction =
    (payload: PublishArticle.payload): PublishArticle.action =>
  PublishArticle.action(~type_=PublishArticle.actionType, ~payload);

let publishArticleEpic =
    (
      action: PublishArticle.action,
      _store,
      dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    ->(ofType(PublishArticle.actionType))
    ->(
        switchMap(publishArticleAction => {
          let (apolloClient, subscriber, personalSign) =
            dependencies
            ->(
                ReduxObservable.Dependencies.apolloClientGet,
                ReduxObservable.Dependencies.subscribeToOffchainEvent,
                ReduxObservable.Dependencies.personalSignGet,
              );

          let (resourceID, version, contentHash, contributor, dateCreated) =
            publishArticleAction
            ->PublishArticle.payloadGet
            ->PublishArticle.(
                idGet,
                versionGet,
                contentHashGet,
                contributorGet,
                dateCreatedGet,
              );

          let publishArticleHash =
            PublishArticle.generatePublishArticleHash(
              ~id=resourceID,
              ~version,
              ~contentHash,
              ~contributor,
              ~dateCreated,
            );

          let owner =
            publishArticleAction
            ->PublishArticle.payloadGet
            ->PublishArticle.ownerGet
            ->Js.Nullable.toOption;

          fromPromise(personalSign(publishArticleHash))
          ->mergeMap(signature => {
              let publishArticleMutation =
                Article_Queries.PublishArticle.makeWithVariables({
                  "id": Some(resourceID),
                  "version": Some(version),
                  "signature": Some(signature),
                  "owner":
                    Belt.Option.mapWithDefault(owner, None, owner =>
                      Some(owner)
                    ),
                });

              fromPromise(
                apolloClient##mutate({
                  "mutation": Article_Queries.PublishArticleMutation.graphqlMutationAST,
                  "variables": publishArticleMutation##variables,
                  "fetchPolicy": Js.Nullable.undefined,
                }),
              );
            })
          ->(
              map(response => {
                let possibleResponse = Js.Nullable.toOption(response##data);
                switch (possibleResponse) {
                | Some(data) =>
                  let result = Article_Queries.PublishArticle.parse(data);
                  switch (result##publishArticle |? (x => x##hash)) {
                  | Some(hash) => hash
                  | None => raise(NoHashFound)
                  };
                | _ => raise(NoResponseData)
                };
              })
            )
          ->(tap(Js.log))
          ->(flatMap(hash => fromPromise(subscriber(hash))))
          ->(tap(Js.log))
          ->(tap(_ => apolloClient##resetStore()))
          ->(
              mergeMap(_ => {
                let trackPublishArticlePayload =
                  App_Module.trackMixPanelPayload(
                    ~event="Offchain",
                    ~metaData=
                      App_Module.trackMixPanelMetaData(
                        ~resource="article",
                        ~resourceID,
                        ~resourceVersion=string_of_int(version),
                        ~resourceAction="publish draft article",
                      ),
                  );
                let trackPublishArticleAction =
                  App_Module.trackMixPanelAction(trackPublishArticlePayload);

                let notificationType =
                  App_Module.notificationTypeToJs(`Success);
                let showPublishArticleNotificationPayload =
                  App_Module.showNotificationPayload(
                    ~notificationType,
                    ~message="Article submitted",
                    ~description=
                      "Your draft article has been submitted for review or published if it's a personal article!",
                  );

                let showPublishArticleNotificationAction =
                  App_Module.showNotificationAction(
                    showPublishArticleNotificationPayload,
                  );

                of3(
                  trackPublishArticleAction,
                  showPublishArticleNotificationAction,
                  App_Module.routeChangeAction(
                    App_Module.route(
                      ~slug1=ArticleId(resourceID),
                      ~slug2=ArticleVersionId(version),
                      ~routeType=
                        owner
                        ->Belt.Option.mapWithDefault(
                            App_Module.ArticlePublished, _ =>
                            App_Module.ArticleSubmitted
                          ),
                    ),
                  ),
                );
              })
            );
        })
      )
  );