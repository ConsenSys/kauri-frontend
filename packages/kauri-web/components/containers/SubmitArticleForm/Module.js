// @flow

import { Observable } from 'rxjs/Observable'
import { submitArticle, editArticle, getArticle } from '../../../queries/Article'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'
import { publishArticleAction } from './PublishArticle_Module.bs'

import type { Classification } from '../Link/Module'
import type { Dependencies } from '../../../lib/Module'

export type MetadataPayload = {
  version?: string,
}

export type SubmitArticlePayload = {
  article_id?: string,
  subject: string,
  text: string,
  metadata?: MetadataPayload,
  selfPublish?: boolean,
}

export type EditArticlePayload = { article_id: string, article_version: number, text: string, subject: string }

export const formatMetadata = ({ version }: MetadataPayload) => ({ FOR_VERSION: version })

export type SubmitArticleAction = { type: 'SUBMIT_ARTICLE', payload: SubmitArticlePayload }

export type EditArticleAction = { type: 'EDIT_ARTICLE', payload: EditArticlePayload }

const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE'

const EDIT_ARTICLE = 'EDIT_ARTICLE'

export const submitArticleAction = (payload: SubmitArticlePayload): SubmitArticleAction => ({
  type: SUBMIT_ARTICLE,
  payload,
})

export const editArticleAction = (payload: EditArticlePayload): EditArticleAction => ({
  type: EDIT_ARTICLE,
  payload,
})

export const submitArticleEpic = (
  action$: Observable<SubmitArticleAction>,
  _: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(SUBMIT_ARTICLE)
    .switchMap(({ payload: { request_id, text, subject, article_id, metadata, selfPublish } }) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: submitArticle,
          variables: {
            article_id,
            text,
            subject,
            metadata,
          },
        })
      )
        .do(h => console.log(h))
        .flatMap(({ data: { submitArticle: { hash } } }: { data: { submitArticle: { hash: string } } }) =>
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
                `/article/${id}/v${version}/article-${typeof category === 'string' ? 'submitted' : 'published'}`
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
                message: `Article ${typeof category === 'string' ? 'submitted' : 'published'}`,
                description:
            typeof category === 'string'
              ? 'Waiting for it to be reviewed!'
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
    .switchMap(({ payload: { article_id, article_version, text, subject } }: EditArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: editArticle,
          variables: { article_id, article_version, text, subject },
        })
      )
        .flatMap(({ data: { editArticleVersion: { hash } } }: { data: { editArticle: { hash: string } } }) =>
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
