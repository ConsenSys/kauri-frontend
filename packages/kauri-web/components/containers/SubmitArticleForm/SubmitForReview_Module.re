open Infix_Utilities;

exception NoHashFound;
exception NoResponseData;

module SubmitForReview = {
  let actionType = "SUBMIT_FOR_REVIEW";

  [@bs.deriving abstract]
  type payload = {
    id: string,
    article_version: int,
  };

  [@bs.deriving abstract]
  type action = {
    [@bs.as "type"]
    type_: string,
    payload,
  };
};

let submitForReviewAction =
    (payload: SubmitForReview.payload): SubmitForReview.action =>
  SubmitForReview.action(~type_=SubmitForReview.actionType, ~payload);

let submitForReviewEpic =
    (
      action: SubmitForReview.action,
      _store,
      dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    ->(ofType(SubmitForReview.actionType))
    ->(
        switchMap(submitForReviewAction => {
          let (apolloClient, subscriber) =
            dependencies
            ->(
                ReduxObservable.Dependencies.apolloClientGet,
                ReduxObservable.Dependencies.subscribeToOffchainEvent,
              );

          let (resourceID, article_version) =
            submitForReviewAction
            ->SubmitForReview.payloadGet
            ->SubmitForReview.(idGet, article_versionGet);

          let submitForReviewMutation =
            Article_Queries.SubmitForReview.make(
              ~id=resourceID,
              ~article_version,
              (),
            );

          fromPromise(
            apolloClient##mutate({
              "mutation": Article_Queries.SubmitForReviewMutation.graphqlMutationAST,
              "variables": submitForReviewMutation##variables,
              "fetchPolicy": Js.Nullable.undefined,
            }),
          )
          ->(
              map(response => {
                let possibleResponse = Js.Nullable.toOption(response##data);
                switch (possibleResponse) {
                | Some(data) =>
                  let result = Article_Queries.SubmitForReview.parse(data);
                  switch (result##submitForReview |? (x => x##hash)) {
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
              flatMap(article_version => {
                open App_Module;

                let trackSubmitForReviewPayload =
                  trackMixPanelPayload(
                    ~event="Offchain",
                    ~metaData={
                      resource: "article",
                      resourceID,
                      resourceVersion: string_of_int(article_version),
                      resourceAction: "submit for review draft article",
                    },
                  );
                let trackSubmitForReviewAction =
                  trackMixPanelAction(trackSubmitForReviewPayload);

                let notificationType = notificationTypeToJs(`Success);
                let showSubmitForReviewNotificationPayload =
                  showNotificationPayload(
                    ~notificationType,
                    ~message="Article submitted",
                    ~description=
                      "Your draft article has been submitted for review or published if it's a personal article!",
                  );

                let showSubmitForReviewNotificationAction =
                  showNotificationAction(
                    showSubmitForReviewNotificationPayload,
                  );

                of3(
                  trackSubmitForReviewAction,
                  showSubmitForReviewNotificationAction,
                  routeChangeAction(
                    route(
                      ~slug1=ArticleId(resourceID),
                      ~slug2=ArticleVersionId(article_version),
                      ~routeType=ArticleSubmitted,
                    ),
                  ),
                );
              })
            );
        })
      )
  );