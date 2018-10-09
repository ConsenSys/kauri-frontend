// @flow

import { Observable } from 'rxjs/Observable'
import { submitArticleVersion, editArticle, getArticle, submitNewArticle, approveArticle, rejectArticle } from '../../../queries/Article'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'
import { publishArticleAction } from './PublishArticle_Module.bs'
import generatePublishArticleHash from '../../../lib/generate-publish-article-hash';

import type { Classification } from '../Link/Module'
import type { Dependencies } from '../../../lib/Module'

export type AttributesPayload = {
  version?: string,
  background?: string,
};

export type SubmitArticlePayload = {
  article_id?: string,
  subject: string,
  text: string,
  attributes?: AttributesPayload,
  selfPublish?: boolean,
};

export type SubmitArticleVersionPayload = {
  id: string,
  subject: string,
  text: string,
  attributes?: AttributesPayload,
  selfPublish?: boolean,
};

export type DraftArticleActionPayload = {
  id?: string,
  text: string,
  subject: string,
  attributes?: AttributesPayload,
};

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

const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE'

const EDIT_ARTICLE = 'EDIT_ARTICLE'

const SUBMIT_ARTICLE_VERSION = 'SUBMIT_ARTICLE_VERSION'

const DRAFT_ARTICLE = 'DRAFT_ARTICLE'

const APPROVE_ARTICLE = 'APPROVE_ARTICLE'

const REJECT_ARTICLE = 'REJECT_ARTICLE'

export type EditArticlePayload = { id: string, version: number, text: string, subject: string, attributes?: AttributesPayload }

export type SubmitArticleAction = { type: string, payload: SubmitArticlePayload }

export type SubmitArticleVersionAction = { type: string, payload: SubmitArticleVersionPayload }

export type EditArticleAction = { type: string, payload: EditArticlePayload }

export type DraftArticleAction = { type: string, payload: DraftArticleActionPayload }

export type ApproveArticleAction = { type: string, payload: ApproveArticlePayload }

export type RejectArticleAction = { type: string, payload: RejectArticlePayload }

export const submitArticleAction = (payload: SubmitArticlePayload): SubmitArticleAction => ({
  type: SUBMIT_ARTICLE,
  payload,
})

export const editArticleAction = (payload: EditArticlePayload): EditArticleAction => ({
  type: EDIT_ARTICLE,
  payload,
})

export const submitArticleVersionAction = (payload: SubmitArticleVersionPayload): SubmitArticleVersionAction => ({
  type: SUBMIT_ARTICLE_VERSION,
  payload,
})

export const draftArticleAction = (payload: DraftArticleActionPayload): DraftArticleAction => ({
  type: DRAFT_ARTICLE,
  payload,
});

export const approveArticleAction = (payload: ApproveArticlePayload): ApproveArticleAction => ({
  type: APPROVE_ARTICLE,
  payload,
});

export const rejectArticleAction = (payload: RejectArticlePayload): RejectArticleAction => ({
  type: REJECT_ARTICLE,
  payload,
});

export const submitArticleEpic = (
  action$: Observable<SubmitArticleAction>,
  _: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE)
    .switchMap(({ payload: { request_id, text, subject, article_id, attributes, selfPublish } }) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: submitNewArticle,
          variables: { content: text, title: subject, attributes },
        })
      )
        .do(h => console.log('submitNewArticle'))
        .do(h => console.log(h))
        .flatMap(({ data: { submitNewArticle: { hash } } }: { data: { submitNewArticle: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(h => console.log(h))
        .mergeMap(({ data: { output: { id, version } } }) =>
          apolloClient.query({
            query: getArticle,
            variables: {
              id, version,
            },
            fetchPolicy: 'network-only',
          })
        )
        .do(h => console.log(h))
        .do(h => apolloClient.resetStore())
        .mergeMap(({ data: { getArticle: { id, version, contentHash, dateCreated, authorId, owner } } }) =>
          (typeof selfPublish !== 'undefined')
            ? Observable.of(
              publishArticleAction({
                id,
                version,
                contentHash,
                dateCreated,
                contributor: authorId,
                owner,
              }))
            : Observable.of(
              routeChangeAction(
                `/article/${id}/v${version}/article-published`
              ),
              trackMixpanelAction({
                event: 'Offchain',
                metaData: {
                  resource: 'article',
                  resourceID: id,
                  resourceVersion: version,
                  resourceAction: 'submit article',
                },
              }),
              showNotificationAction({
                notificationType: 'success',
                message: `Article published`,
                description: 'Your personal article has now been published!',
              })
            ))
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
    )

export const submitArticleVersionEpic = (
  action$: Observable<SubmitArticleVersionAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE_VERSION)
    .switchMap(({ payload: { text, subject, id, attributes, selfPublish } }) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: submitArticleVersion,
          variables: {
            id,
            text,
            subject,
            attributes,
          },
        })
      )
        .do(h => console.log(h))
        .flatMap(({ data: { submitArticleVersion: { hash } } }: { data: { submitArticleVersion: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(h => console.log(h))
        .mergeMap(({ data: { output: { id, version } } }) =>
          apolloClient.query({
            query: getArticle,
            variables: {
              id, version,
            },
            fetchPolicy: 'network-only',
          })
        )
        .do(h => console.log(h))
        .do(h => apolloClient.resetStore())
        .mergeMap(({ data: { getArticle: { id, version, contentHash, dateCreated, authorId, author } } }) =>
          (typeof selfPublish !== 'undefined')
            ? Observable.of(
              publishArticleAction({
                id,
                version,
                contentHash,
                dateCreated,
                contributor: authorId,
                author,
              }))
            : Observable.of(
              routeChangeAction(
                `/article/${id}/v${version}/article-${'published'}`
              ),
              trackMixpanelAction({
                event: 'Offchain',
                metaData: {
                  resource: 'article',
                  resourceID: id,
                  resourceVersion: version,
                  resourceAction: 'submit article version',
                },
              }),
              showNotificationAction({
                notificationType: 'success',
                message: `Article ${(typeof selfPublish === 'undefined') ? 'submitted' : 'published'}`,
                description:
                (typeof selfPublish === 'undefined') ? 'Waiting for it to be reviewed!'
                  : 'Your personal article has now been published!',
              })
            ))
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
    )

export const editArticleEpic = (
  action$: Observable<EditArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(EDIT_ARTICLE)
    .switchMap(({ payload: { id, version, text, subject, attributes } }: EditArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: editArticle,
          variables: { id, version, text, subject, attributes },
        })
      )
        .flatMap(({ data: { editArticleVersion: { hash } } }: { data: { editArticle: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .do(h => console.log(h))
        .flatMap(({ data: { output: { id, version } } }) =>
          Observable.of(
            routeChangeAction(`/article/${id}/v${version}/article-updated`),
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'article',
                resourceID: id,
                resourceVersion: version,
                resourceAction: 'update article',
              },
            }),
            showNotificationAction({
              notificationType: 'info',
              message: 'Article updated',
              description: 'The article version has been updated!',
            })
          )
        )
    )


export const draftArticleEpic = (
  action$: Observable<DraftArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(DRAFT_ARTICLE)
    .switchMap(({ payload: { article_id, article_version, text, subject, attributes } }: DraftArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: submitNewArticle,
          variables: { content: text, title: subject, attributes },
        })
      )
        .flatMap(({ data: { submitNewArticle: { hash } } }: { data: { submitNewArticle: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .flatMap(({ data: { output: { id, version } } }) =>
          Observable.of(
            routeChangeAction(`/article/${id}/v${version}/article-updated`),
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'article',
                resourceID: id,
                resourceVersion: version,
                resourceAction: 'article-drafted',
              },
            }),
            showNotificationAction({
              notificationType: 'info',
              message: 'Draft Created',
              description: 'The draft has just been saved. You can go back and submit it whenever you are ready.',
            })
          )
        )
    )
  
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
        .do(h => console.log(h))
        .flatMap(() =>
          Observable.of(
            routeChangeAction(`/article/${id}/v${version}/article-rejected`),
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'article',
                resourceID: id,
                resourceVersion: version,
                resourceAction: 'reject article',
              },
            }),
            showNotificationAction({
              notificationType: 'info',
              message: 'Article rejected',
              description: 'The article version has been rejected!',
            })
          )
        )
    )