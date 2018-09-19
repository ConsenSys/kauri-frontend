// @flow

import { Observable } from 'rxjs/Observable'
import {
  createRequest,
  searchRequests,
  updateRequest,
  storeRequestOwnershipSignature,
  getRequest,
} from '../../../queries/Request'
import createReducer from '../../../lib/createReducer'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'

import type { Dependencies } from '../../../lib/Module'

type State = {}

export type CreateRequestPayload = {
  bounty: number,
  subject: string,
  text: string,
  category: string,
  sub_category: 'general' | 'tutorial' | 'walkthrough',
  dead_line: any,
}

type CreateRequestAction = { type: string, payload: CreateRequestPayload, callback: any }

type Action = CreateRequestAction

const initialState: State = {}

const CREATE_REQUEST: string = 'CREATE_REQUEST'

export const createRequestAction = (payload: CreateRequestPayload, callback: any): CreateRequestAction => ({
  type: CREATE_REQUEST,
  payload,
  callback,
})

export const createRequestEpic = (
  action$: Observable<CreateRequestAction>,
  { getState, dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, web3PersonalSign, getGasPrice }: Dependencies
) =>
  action$
    .ofType(CREATE_REQUEST)
    .switchMap(
      ({ payload: { bounty, subject, text, category, dead_line, sub_category }, callback }: CreateRequestAction) => {
        dead_line = dead_line.utc().valueOf()
        console.log(dead_line)
        const weiBounty = web3.toWei(bounty, 'ether')

        if (window.web3.eth.accounts[0] !== getState().app && getState().app.userId) {
          return Observable.throw('Wrong metamask account').catch(err => {
            console.log(err)
            return Observable.of(
              showNotificationAction({
                notificationType: 'error',
                message: 'Wrong metamask account',
                description: 'Please switch to the correct account!',
              })
            )
          })
        }

        return Observable.fromPromise(
          apolloClient.mutate({
            mutation: createRequest,
            variables: { bounty, subject, text, category, dead_line, sub_category },
          })
        )
          .flatMap(({ data: { createRequest: { hash } } }: { data: { createRequest: { hash: string } } }) =>
            apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .switchMap(({ data: { output: { id, content_hash } } }) =>
            web3PersonalSign(id, id + web3.eth.accounts[0] + content_hash, storeRequestOwnershipSignature)
              .flatMap(() => getGasPrice())
              .flatMap(gasPrice =>
                smartContracts().KauriCore.addRequest.sendTransaction(
                  id,
                  web3.sha3(content_hash).toString('hex'),
                  category,
                  Math.floor(dead_line / 1000),
                  weiBounty,
                  {
                    from: web3.eth.accounts[0],
                    value: weiBounty,
                    gas: 250000,
                    gasPrice,
                  }
                )
              )
              .do(() => callback && callback())
              .do((transactionHash: string) => {
                dispatch(routeChangeAction(`/request/${id}/request-created`))
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
                      resource: 'request',
                      resourceID: id,
                      resourceAction: 'add request transaction submitted',
                      additionalBounty: bounty,
                      transactionHash,
                    },
                  })
                )
              })
              .flatMap((transactionHash: string) =>
                Observable.fromPromise(apolloSubscriber(transactionHash, 'RequestCreated'))
              )
              .do(h => console.log(h))
              .flatMap(() => apolloClient.resetStore())
              .flatMap(() =>
                apolloClient.query({
                  query: searchRequests,
                  variables: {
                    filter: {
                      status_in: ['OPENED'],
                    },
                  },
                  fetchPolicy: 'network-only',
                })
              )
              .flatMap(() =>
                apolloClient.query({
                  query: getRequest,
                  variables: {
                    request_id: id,
                  },
                  fetchPolicy: 'network-only',
                })
              )
              .mapTo(
                showNotificationAction({
                  notificationType: 'success',
                  message: 'Request has been mined!',
                  description: '1 block has been confirmed!',
                })
              )
              .catch(err => {
                if (err.message && err.message.includes('invalid address')) {
                  return Observable.of(
                    showNotificationAction({
                      notificationType: 'error',
                      message: 'Your wallet is locked!',
                      description: 'Please unlock your wallet!',
                    })
                  )
                } else if (err.message && err.message.includes("'KauriCore' of undefined")) {
                  return Observable.of(
                    showNotificationAction({
                      notificationType: 'error',
                      message: 'Wrong network',
                      description: 'Please switch to the correct network!',
                    })
                  )
                } else if (err.message && err.message.includes('Wrong metamask account')) {
                  return Observable.of(
                    showNotificationAction({
                      notificationType: 'error',
                      message: 'Wrong metamask account',
                      description: 'Please switch to the correct account!',
                    })
                  )
                }
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
      }
    )

const handlers = {
  [CREATE_REQUEST]: (state: State, action: Action) => ({
    ...state,
    hello: action.payload,
  }),
}

export default createReducer(initialState, handlers)

// flatMap

export type UpdateRequestPayload = { request_id: string, subject: string, text: string }

export type UpdateRequestAction = { type: 'UPDATE_REQUEST', payload: UpdateRequestPayload }

const UPDATE_REQUEST = 'UPDATE_REQUEST'

export const updateRequestAction = (payload: UpdateRequestPayload): UpdateRequestAction => ({
  type: UPDATE_REQUEST,
  payload,
})

export const updateRequestEpic = (
  action$: Observable<UpdateRequestAction>,
  _: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(UPDATE_REQUEST)
    // .do(({ payload: { request_id, subject, text } }) =>
    //   smartContracts().KauriCore.updateRequest(request_id, web3.sha3(subject + text), {
    //     from: web3.eth.accounts[0],
    //     gas: 250000
    //   })
    // )
    .switchMap(({ payload: { request_id, subject, text } }) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: updateRequest,
          variables: { request_id, subject, text },
        })
      )
        .flatMap(({ data: { editRequest: { hash } } }: { data: { editRequest: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(h => console.log(h))
        .do(() => apolloClient.resetStore())
        .flatMapTo(
          Observable.of(
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'request',
                resourceID: request_id,
                resourceAction: 'update request',
              },
            }),
            showNotificationAction({
              notificationType: 'success',
              message: 'Request updated',
              description: 'The subject and/or description have been updated.',
            }),
            routeChangeAction(`/request/${request_id}`)
          )
        )
    )
