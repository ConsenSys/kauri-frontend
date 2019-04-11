import { Observable } from "rxjs/Observable";
import { Epic } from "redux-observable";
import {
  showNotificationAction,
  IDependencies,
  IReduxState,
} from "../../../../lib/Module";
import { rejectArticleTransfer } from "../../../../queries/Article";
import analytics from "../../../../lib/analytics";

interface IRejectArticleTransferPayload {
  id: string;
}

const REJECT_ARTICLE_TRANSFER = "REJECT_ARTICLE_TRANSFER";

interface IRejectArticleTransferAction {
  type: string;
  payload: IRejectArticleTransferPayload;
}

export const rejectArticleTransferAction = (
  payload: IRejectArticleTransferPayload
): IRejectArticleTransferAction => ({
  payload,
  type: REJECT_ARTICLE_TRANSFER,
});

export const rejectArticleTransferEpic: Epic<
  any,
  IReduxState,
  IDependencies
> = (action$, _, { apolloClient, apolloSubscriber }) =>
  action$
    .ofType(REJECT_ARTICLE_TRANSFER)
    .switchMap(({ payload: { id } }: IRejectArticleTransferAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: rejectArticleTransfer,
          variables: { id },
        })
      )
        .flatMap(
          ({
            data: {
              rejectArticleTransfer: { hash },
            },
          }: {
            data: { rejectArticleTransfer: { hash: string } };
          }) => apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .do(() =>
          analytics.track("Article Transfer Rejected", {
            category: "article_actions",
          })
        )
        .mergeMap<any, any>(() =>
          Observable.merge(
            Observable.of(
              showNotificationAction({
                description: `You successfully rejected the ownership of the article!`,
                message: "Article Transfer Rejected!",
                notificationType: "success",
              })
            )
          )
        )
    );
