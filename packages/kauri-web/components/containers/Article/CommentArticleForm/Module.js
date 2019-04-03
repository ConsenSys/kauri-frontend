import { Observable } from "rxjs/Observable";
import { addComment } from "../../../../queries/Article";
import { showNotificationAction } from "../../../../lib/Module";
import analytics from "../../../../lib/analytics";

export type AddCommentParentPayload = {
  type: "ARTICLE" | "REQUEST",
  id: string,
  version: string,
};

export type AddCommentPayload = {
  parent: AddCommentParentPayload,
  body: string,
};

export type AddCommentAction = {
  type: string,
  payload: AddCommentPayload,
  callback: any,
};

export const ADD_COMMENT: string = "ADD_COMMENT";

export const addCommentAction = (
  payload: AddCommentPayload,
  callback: any
): AddCommentAction => ({
  type: ADD_COMMENT,
  payload,
  callback,
});

export const addCommentEpic = (
  action$: Observable<AddCommentAction>,
  _: any,
  { apolloClient, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(ADD_COMMENT)
    .switchMap(({ payload: { parent, body }, callback }: AddCommentAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: addComment,
          variables: { parent, body },
        })
      )
        .flatMap(
          ({
            data: {
              addComment: { hash },
            },
          }: {
            data: { addComment: { hash: string } },
          }) => apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .do(h => console.log(h))
        .do(h => (callback ? callback() : null))
        .do(() =>
          analytics.track("Leave Comment", {
            category: "article_actions",
          })
        )
        .mergeMap(() =>
          Observable.of(
            showNotificationAction({
              notificationType: "success",
              message: "Comment added",
              description: `Your comment has been added to the article!`,
            })
          )
        )
        .catch(err => {
          console.error(err);
          return Observable.of(
            showNotificationAction({
              notificationType: "error",
              message: "Submission error",
              description: "Please try again!",
            })
          );
        })
    );
