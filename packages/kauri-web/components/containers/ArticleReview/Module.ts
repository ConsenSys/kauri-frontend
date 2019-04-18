import { Observable } from "rxjs/Observable";
import { Epic } from "redux-observable";
import {
  showNotificationAction,
  routeChangeAction,
  IDependencies,
} from "../../../lib/Module";
import generatePublishArticleHash from "../../../lib/generate-publish-article-hash";
import { getEvent } from "../../../queries/Module";
import { create } from "../../../lib/init-apollo";
import { approveArticle, rejectArticle } from "../../../queries/Article";
import analytics from "../../../lib/analytics";

interface IApproveArticlePayload {
  id: string;
  version: number;
  author: string;
  contentHash: string;
  dateCreated: string;
}

const APPROVE_ARTICLE = "APPROVE_ARTICLE";

interface IApproveArticleAction {
  type: string;
  payload: IApproveArticlePayload;
}

export const approveArticleAction = (
  payload: IApproveArticlePayload
): IApproveArticleAction => ({
  payload,
  type: APPROVE_ARTICLE,
});

interface IReduxState {
  app: {
    user: {
      id: string;
    };
    hostName: string;
  };
}

export const approveArticleEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  { getState },
  { apolloClient, personalSign }
) =>
  action$
    .ofType(APPROVE_ARTICLE)
    .switchMap(
      ({ payload: { id, version, contentHash, author, dateCreated } }) =>
        Observable.fromPromise(
          personalSign(
            generatePublishArticleHash(
              id,
              version,
              contentHash,
              author,
              dateCreated
            )
          )
        )
          .mergeMap(signature =>
            apolloClient.mutate({
              mutation: approveArticle,
              variables: {
                id,
                signature,
                version,
              },
            })
          )
          .mergeMap(({ data: { approveArticle: { hash } } }) =>
            Observable.fromPromise(
              new Promise<{ data: any }>((resolve, reject) => {
                create(
                  {},
                  {
                    getToken: () => "DUMMYVERIFICATIONTOKEN",
                    hostName: getState().app.hostName,
                  }
                )
                  .subscribe({
                    query: getEvent,
                    variables: { hash },
                  })
                  .subscribe({
                    error: (err: Error) => reject(err),
                    next: (data: any) => resolve(data),
                  });
              })
            )
          )
          .do(() =>
            analytics.track("Article Update Approved", {
              category: "article_actions",
            })
          )
          .do(() => apolloClient.resetStore())
          .mergeMap<any, any>(() =>
            Observable.merge(
              Observable.of(
                routeChangeAction(
                  `/article/${id}/v${version}/article-${"published"}`
                )
              ),
              Observable.of(
                showNotificationAction({
                  description: "The update has been approved!",
                  message: `Article approved`,
                  notificationType: "success",
                })
              )
            )
          )
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                description: "Please try again!",
                message: "Approval error",
                notificationType: "error",
              })
            );
          })
    );

interface IRejectArticlePayload {
  id: string;
  version: number;
  cause: string;
}

const REJECT_ARTICLE = "REJECT_ARTICLE";

interface IRejectArticleAction {
  type: string;
  payload: IRejectArticlePayload;
}

export const rejectArticleAction = (
  payload: IRejectArticlePayload
): IRejectArticleAction => ({
  payload,
  type: REJECT_ARTICLE,
});

export const rejectArticleEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(REJECT_ARTICLE)
    .switchMap(({ payload: { id, version, cause } }: IRejectArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: rejectArticle,
          variables: { id, version, cause },
        })
      )
        .flatMap(
          ({
            data: {
              rejectArticle: { hash },
            },
          }: {
            data: { rejectArticle: { hash: string } };
          }) => apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .do(() =>
          analytics.track("Article Update Rejected", {
            category: "article_actions",
          })
        )
        .mergeMap<any, any>(() =>
          Observable.merge(
            Observable.of(
              routeChangeAction(`/article/${id}/v${version}/article-rejected`)
            ),
            Observable.of(
              showNotificationAction({
                description: `It will not show up in your approvals queue anymore!`,
                message: "Article rejected!",
                notificationType: "success",
              })
            )
          )
        )
    );
