import { Observable } from "rxjs/Observable";
import { Epic } from "redux-observable";
import {
  showNotificationAction,
  IDependencies,
  IReduxState,
} from "../../../../lib/Module";
import {
  rejectArticleTransfer,
  acceptArticleTransfer,
  finaliseArticleTransfer,
} from "../../../../queries/Article";
import analytics from "../../../../lib/analytics";
import generatePublishArticleHash from "../../../../lib/generate-publish-article-hash";
import { create } from "../../../../lib/init-apollo";
import { getEvent } from "../../../../queries/Module";

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
        .mergeMap<any, any>(() =>
          Observable.merge(
            Observable.of(
              showNotificationAction({
                description: `You successfully rejected the ownership of the article!`,
                message: "Article Transfer Rejected!",
                notificationType: "success",
              })
            ),
            Observable.of(
              analytics.track("Article Transfer Rejected", {
                category: "article_actions",
              })
            )
          )
        )
    );

interface IAcceptArticleTransferPayload {
  id: string;
}

const ACCEPT_ARTICLE_TRANSFER = "ACCEPT_ARTICLE_TRANSFER";

interface IAcceptArticleTransferAction {
  type: string;
  payload: IAcceptArticleTransferPayload;
}

export const acceptArticleTransferAction = (
  payload: IAcceptArticleTransferPayload
): IAcceptArticleTransferAction => ({
  payload,
  type: ACCEPT_ARTICLE_TRANSFER,
});

export const acceptArticleTransferEpic: Epic<
  any,
  IReduxState,
  IDependencies
> = (action$, { getState }, { apolloClient }) =>
  action$
    .ofType(ACCEPT_ARTICLE_TRANSFER)
    .switchMap(({ payload: { id } }: IAcceptArticleTransferAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: acceptArticleTransfer,
          variables: { id },
        })
      )
        .mergeMap(({ data: { acceptArticleTransfer: { hash } } }) =>
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
        .mergeMap(
          ({
            data: {
              output: { hash, version, articleAuthor, dateCreated },
            },
          }) =>
            Observable.of(
              finaliseArticleTransferAction({
                contentHash: hash,
                contributor: articleAuthor,
                dateCreated,
                id,
                version: parseInt(version, 10),
              })
            )
        )
    );

interface IFinaliseArticleTransferPayload {
  id: string;
  contentHash: string;
  contributor: string;
  dateCreated: string;
  version: number;
}

const FINALISE_ARTICLE_TRANSFER = "FINALISE_ARTICLE_TRANSFER";

interface IFinaliseArticleTransferAction {
  type: string;
  payload: IFinaliseArticleTransferPayload;
}

export const finaliseArticleTransferAction = (
  payload: IFinaliseArticleTransferPayload
): IFinaliseArticleTransferAction => ({
  payload,
  type: FINALISE_ARTICLE_TRANSFER,
});

export const finaliseArticleTransferEpic: Epic<
  any,
  IReduxState,
  IDependencies
> = (action$, _, { apolloClient, apolloSubscriber, personalSign }) =>
  action$
    .ofType(FINALISE_ARTICLE_TRANSFER)
    .switchMap(
      ({
        payload: { id, version, contentHash, contributor, dateCreated },
      }: IFinaliseArticleTransferAction) => {
        const signatureToSign = generatePublishArticleHash(
          id,
          version,
          contentHash,
          contributor,
          dateCreated
        );
        return Observable.fromPromise(personalSign(signatureToSign))
          .mergeMap(signature =>
            Observable.fromPromise(
              apolloClient.mutate({
                mutation: finaliseArticleTransfer,
                variables: {
                  id,
                  signature,
                },
              })
            )
          )
          .flatMap(
            ({
              data: {
                finaliseArticleTransfer: { hash },
              },
            }: {
              data: { finaliseArticleTransfer: { hash: string } };
            }) => apolloSubscriber(hash)
          )
          .do(() => apolloClient.resetStore())
          .mergeMap(() =>
            Observable.merge(
              Observable.of(
                showNotificationAction({
                  description: `You successfully approved the ownership of the article!`,
                  message: "Article Transfer Accepted",
                  notificationType: "success",
                })
              ),
              Observable.of(
                analytics.track("Article Transfer Accepted", {
                  category: "article_actions",
                })
              )
            )
          );
      }
    );
