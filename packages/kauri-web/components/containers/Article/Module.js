// @flow

import { Observable } from 'rxjs/Observable'
import { trackMixpanelAction } from '../Link/Module'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import generatePublishArticleHash from '../../../lib/generate-publish-article-hash';

import {
  rejectArticle,
  approveArticle,
  storeArticleValidationSignature,
  deleteArticleComment,
  getArticle,
} from '../../../queries/Article'

import type { Dependencies } from '../../../lib/Module'

export type DeleteArticleCommentPayload = {
  article_id: string,
  comment_id: number,
}

export type ApproveArticlePayload = {
  id: string,
  version: number,
  author: string,
  contentHash: string,
  dateCreated: string,
};

export type RejectArticlePayload = {
  id: string,
  version: number,
  cause: string,
};

const APPROVE_ARTICLE = 'APPROVE_ARTICLE'

const REJECT_ARTICLE = 'REJECT_ARTICLE'

export type DeleteArticleCommentAction = { type: string, payload: DeleteArticleCommentPayload, callback: any }

export type RejectArticleAction = { type: string, payload: RejectArticlePayload }

export type ApproveArticleAction = { type: string, payload: ApproveArticlePayload }

export type TipArticlePayload = {
  request_id?: ?string,
  bounty: number,
  article_id: string,
  user_id: string,
  article_version: number,
}

export type TipArticleAction = { type: 'TIP_ARTICLE', payload: TipArticlePayload, callback: any }

const TIP_ARTICLE = 'TIP_ARTICLE'

const DELETE_ARTICLE_COMMENT: string = 'DELETE_ARTICLE_COMMENT'

export const approveArticleAction = (payload: ApproveArticlePayload): ApproveArticleAction => ({
  type: APPROVE_ARTICLE,
  payload,
});

export const rejectArticleAction = (payload: RejectArticlePayload): RejectArticleAction => ({
  type: REJECT_ARTICLE,
  payload,
});

export const tipArticleAction = (payload: TipArticlePayload, callback: any): TipArticleAction => ({
  type: TIP_ARTICLE,
  payload,
  callback,
})

export const deleteArticleCommentAction = (
  payload: DeleteArticleCommentPayload,
  callback: any
): DeleteArticleCommentAction => ({
  type: DELETE_ARTICLE_COMMENT,
  payload,
  callback,
})

export const approveArticleEpic = (
  action$: Observable<ApproveArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, personalSign }: Dependencies
) =>
  action$
    .ofType(APPROVE_ARTICLE)
    .switchMap(({ payload: {id, version, contentHash, author, dateCreated} }) =>
      Observable.fromPromise(personalSign(generatePublishArticleHash(id, version, contentHash, author, dateCreated)))
      .mergeMap((signature) =>
        apolloClient.mutate({
          mutation: approveArticle,
          variables: {
            id,
            version,
            signature,
          },
        })
      )
        .do(h => apolloClient.resetStore())
        .mergeMap(data =>
            Observable.of(
              routeChangeAction(
                `/article/${id}/v${version}/article-${'published'}`
              ),
              trackMixpanelAction({
                event: 'Offchain',
                metaData: {
                  resource: 'article',
                  resourceID: id,
                  resourceVersion: version,
                  resourceAction: 'approved article',
                },
              }),
              showNotificationAction({
                notificationType: 'success',
                message: `Article approved`,
                description: 'The update has been approved!',
              })
            ))
        .catch(err => {
          console.error(err)
          return Observable.of(
            showNotificationAction({
              notificationType: 'error',
              message: 'Approval error',
              description: 'Please try again!',
            })
          )
        })
    )

export const tipArticleEpic = (
  action$: Observable<TipArticleAction>,
  { dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, getGasPrice }: Dependencies
) =>
  action$
    .ofType(TIP_ARTICLE)
    .switchMap(
      ({ payload: { article_id, request_id, user_id, bounty, article_version }, callback }: TipArticleAction) => {
        const weiBounty = web3.toWei(bounty, 'ether')

        return Observable.fromPromise(getGasPrice())
          .flatMap(gasPrice =>
            smartContracts().KauriCore.tipArticle.sendTransaction(
              article_id,
              article_version,
              request_id || '',
              user_id,
              weiBounty,
              {
                from: web3.eth.accounts[0],
                value: weiBounty,
                gas: 250000,
                gasPrice,
              }
            )
          )
          .do(() => callback())
          .do((transactionHash: string) => {
            dispatch(
              showNotificationAction({
                notificationType: 'info',
                message: 'Waiting for it to be mined',
                description: 'You will get another notification when the block is mined!',
              })
            )
            dispatch(
              trackMixpanelAction({
                event: 'Onchain',
                metaData: {
                  resource: 'article',
                  resourceID: article_id,
                  resourceAction: 'tip article transaction submitted',
                  additionalTip: bounty,
                  transactionHash,
                },
              })
            )
          })
          .flatMap((transactionHash: string) => apolloSubscriber(transactionHash, 'ArticleTipped'))
          .do(() => apolloClient.resetStore())
          .mapTo(
            showNotificationAction({
              notificationType: 'success',
              message: 'Article contribution has been mined!',
              description: `Amount of ${bounty} ETH`,
            })
          )
          .catch(err => {
            console.error(err)
            return Observable.of(
              showNotificationAction({
                notificationType: 'error',
                message: 'Submission error',
                description: 'Please try again!',
              })
            )
          })
      }
    )

export const rejectArticleEpic = (
  action$: Observable<RejectArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(REJECT_ARTICLE)
    .switchMap(({ payload: { id, version, cause } }: RejectArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: rejectArticle,
          variables: { id, version, cause },
        })
      )
        .flatMap(({ data: { rejectArticle: { hash } } }: { data: { rejectArticle: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .mergeMap(() =>
          Observable.of(
            routeChangeAction(`/article/${article_id}/v${article_version}/article-rejected`),
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'article',
                resourceID: article_id,
                resourceAction: 'reject article',
              },
            }),
            showNotificationAction({
              notificationType: 'success',
              message: 'Article rejected!',
              description: `It will not show up in your approvals queue anymore!`,
            })
          )
        )
    )

export type AddCommentPayload = {
  article_id: string,
  comment: string,
  highlight_from?: number,
  highlight_to?: number,
  anchor_key?: string,
  focus_key?: string,
}

export const deleteArticleCommentEpic = (
  action$: Observable<DeleteArticleCommentAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(DELETE_ARTICLE_COMMENT)
    .switchMap(({ payload: { comment_id, article_id }, callback }: DeleteArticleCommentAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: deleteArticleComment,
          variables: { comment_id, article_id },
        })
      )
        .flatMap(({ data: { deleteArticleComment: { hash } } }: { data: { deleteArticleComment: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .flatMap(() =>
          apolloClient.query({
            query: getArticle,
            variables: { article_id },
            fetchPolicy: 'network-only',
          })
        )
        .do(h => console.log(h))
        .do(h => (callback ? callback() : null))
        .flatMapTo(
          Observable.of(
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'article',
                resourceID: article_id,
                resourceAction: 'delete comment of article',
              },
            }),
            showNotificationAction({
              notificationType: 'success',
              message: 'Comment deleted',
              description: `Your comment has been deleted from the article review!`,
            })
          )
        )
    )
