// @flow

import { Observable } from 'rxjs'
import {
  submitArticle,
  editArticle,
  getArticleForAnalytics,
  searchPersonalSubmittedArticles,
} from '../../../queries/Article'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'

import type { Dependencies } from '../../../lib/Module'

export type MetadataPayload = {
  version?: string,
}

export type SubmitArticlePayload = {
  article_id?: string,
  request_id?: string,
  subject: string,
  text: string,
  category?: string,
  sub_category: string,
  metadata?: ArticleMetadataDTO,
}

export type EditArticlePayload = { article_id: string, text: string, subject: string }

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
    .switchMap(({ payload: { request_id, text, subject, article_id, category, sub_category, metadata } }) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: submitArticle,
          variables: { request_id, text, subject, sub_category, category, metadata, author_id: web3.eth.accounts[0] },
        })
      )
        .do(h => console.log(h))
        .flatMap(({ data: { submitArticle: { hash } } }: { data: { submitArticle: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(h => console.log(h))
        .do(h => apolloClient.cache.reset())
        .mergeMap(({ data: { command_output: { id } } }) =>
          Observable.of(
            routeChangeAction(`/article/${id}/article-submitted`),
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'article',
                resourceID: id,
                resourceAction: 'submit article',
              },
            }),
            showNotificationAction({
              notificationType: 'success',
              message: 'Article submitted',
              description: 'Waiting for it to be reviewed!',
            })
          )
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
    )

export const editArticleEpic = (
  action$: Observable<EditArticleAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$.ofType(EDIT_ARTICLE).switchMap(({ payload: { article_id, text, subject } }: EditArticleAction) =>
    Observable.fromPromise(
      apolloClient.mutate({
        mutation: editArticle,
        variables: { article_id, text, subject },
      })
    )
      .flatMap(({ data: { editArticle: { hash } } }: { data: { editArticle: { hash: string } } }) =>
        apolloSubscriber(hash)
      )
      .do(() => apolloClient.resetStore())
      .flatMap(() =>
        Observable.of(
          routeChangeAction(`/article/${article_id}/article-submitted`),
          trackMixpanelAction({
            event: 'Offchain',
            metaData: {
              resource: 'article',
              resourceID: article_id,
              resourceAction: 'update article',
            },
          }),
          showNotificationAction({
            notificationType: 'info',
            message: 'Article updated',
            description: "Wait for the topic owner's comments or approval!",
          })
        )
      )
  )
