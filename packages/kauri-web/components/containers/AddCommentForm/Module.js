// @flow

import { Observable } from 'rxjs'
import { commentArticle } from '../../../queries/Article'
import createReducer from '../../../lib/createReducer'
import { showNotificationAction, toggleModalAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'

import type { Dependencies } from '../../../lib/Module'

type State = {}

export type AddCommentPayload = {
  article_id: string,
  article_version: string,
  comment: string,
  highlight_from?: number,
  highlight_to?: number,
  anchor_key?: string,
  focus_key?: string,
}

type AddCommentAction = { type: string, payload: AddCommentPayload, callback: any }

type Action = AddCommentAction

const initialState: State = {}

const ADD_COMMENT: string = 'ADD_COMMENT'

export const addCommentAction = (payload: AddCommentPayload, callback: any): AddCommentAction => ({
  type: ADD_COMMENT,
  payload,
  callback,
})

export const addCommentEpic = (
  action$: Observable<AddCommentAction>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(ADD_COMMENT)
    .switchMap(
      ({
        payload: { anchor_key, focus_key, highlight_from, highlight_to, comment, article_id, article_version },
        callback,
      }: AddCommentAction) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: commentArticle,
            variables: { comment, highlight_from, highlight_to, article_id, article_version, anchor_key, focus_key },
          })
        )
          .flatMap(({ data: { commentArticle: { hash } } }: { data: { commentArticle: { hash: string } } }) =>
            apolloSubscriber(hash)
          )
          .do(() => apolloClient.resetStore())
          .do(h => console.log(h))
          .do(h => (callback ? callback() : null))
          .flatMapTo(
            comment.includes('Submit for publishing')
              ? Observable.of(
                toggleModalAction({}),
                trackMixpanelAction({
                  event: 'Offchain',
                  metaData: {
                    resource: 'article',
                    resourceID: article_id,
                    resourceVersion: article_version,
                    resourceAction: 'add comment for article',
                  },
                })
              )
              : Observable.of(
                toggleModalAction({}),
                trackMixpanelAction({
                  event: 'Offchain',
                  metaData: {
                    resource: 'article',
                    resourceID: article_id,
                    resourceVersion: article_version,
                    resourceAction: 'add comment for article',
                  },
                }),
                showNotificationAction({
                  notificationType: 'success',
                  message: 'Comment added',
                  description: `Your comment has been added to the article submission!`,
                })
              )
          )
    )

const handlers = {
  [ADD_COMMENT]: (state: State, action: Action) => ({
    ...state,
    hello: action.payload,
  }),
}

export default createReducer(initialState, handlers)
