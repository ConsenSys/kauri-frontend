// @flow

import { Observable } from 'rxjs/Observable'
import cookie from 'cookie'
import createReducer from '../../../lib/createReducer'
import { showNotificationAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'
import { loginPersonalSign } from '../../../lib/web3-personal-sign'
import superagent from 'superagent'

import type { Dependencies } from '../../../lib/Module'
const config = require('../../../config').default

const request = superagent.agent()

type State = {}

export type RegisterActionPayload = {
  type?: 'login' | 'register',
}
type RegisterAction = { type: string, payload: RegisterActionPayload, callback: any }

type Action = RegisterAction

const initialState: State = {}

const REGISTER: string = 'REGISTER'

export const registerAction = (payload: RegisterActionPayload, callback: any): RegisterAction => ({
  type: REGISTER,
  payload,
  callback,
})

type InitiateLoginResponse = {
  id: string,
  sentence: string,
  date_created: number,
  date_expiration: number,
  app_id: string,
  active: boolean
};

type FinalLoginResponse = {
  app_id: string,
  client_id: string,
  address: string,
  expiration: number,
  token: string
};

const registerSignaturePayload = (userId, signature, sentence_id) => ({
  address: userId,
  signature,
  sentence_id,
  app_id: config.appId,
  client_id: config.clientId,
})

export const registerEpic = (action$: Observable<RegisterAction>, store: any, { fetch }: Dependencies) =>
  action$.ofType(REGISTER).switchMap(({ payload: { type = 'register' }, callback }: RegisterAction) =>
    Observable.fromPromise(
      request
      // http://api.dev2.kauri.io/web3auth/api/login?app_id=kauri&client_id=kauri-gateway
        .get(`https://${config.getApiURL((store.getState().app && store.getState().app.hostName))}/web3auth/api/login?app_id=${config.appId}&client_id=${config.clientId}`)
    )
      .map(res => res.body)
      .do(h => console.log(h))
      .switchMap(({ sentence, id }: InitiateLoginResponse) =>
        loginPersonalSign(sentence)
          .map((signature: string) => registerSignaturePayload(window.web3.eth.accounts[0], signature, id))
          .mergeMap((payload) =>
            request
              .post(`https://${config.getApiURL((store.getState().app && store.getState().app.hostName))}/web3auth/api/login`)
              .send(payload)
          )
          .map(res => res.body)
          .do(h => console.log(h))
          .do(() => callback())
          .do(({ token }: FinalLoginResponse) => {
            console.log(token)
            console.log(window.web3.eth.accounts[0])
            if (process.env.e2eTesting || process.env.NODE_ENV !== 'production') {
              document.cookie = cookie.serialize('TOKEN', token, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
              })
              document.cookie = cookie.serialize('USER_ID', window.web3.eth.accounts[0], {
                maxAge: 30 * 24 * 60 * 60, // 30 days
              })
            }
          })
          .mergeMapTo(
            Observable.of(
              trackMixpanelAction({
                event: 'Offchain',
                metaData: {
                  resource: 'kauri',
                  resourceID: 'n/a',
                  resourceVersion: 'n/a',
                  resourceAction: 'login',
                },
              }),
              showNotificationAction({
                notificationType: 'success',
                message: type === 'login' ? 'Login successful' : 'Registration successful',
                description: 'Get those bounties!',
              })
            )
          )
          .delay(500)
          .do(() => (window.location = '/profile'))
          .catch(err => {
            console.error(err)
            if (err && err.message.includes('Metamask locked!')) {
              return Observable.of(
                showNotificationAction({
                  notificationType: 'error',
                  message: 'Your wallet is locked!',
                  description: 'Please unlock your wallet!',
                })
              )
            }
            return Observable.of(
              showNotificationAction({
                notificationType: 'error',
                message: 'Submission error',
                description: 'Please try again!',
              })
            )
          })
      )
  )

const handlers = {
  [REGISTER]: (state: State, action: Action) => ({
    ...state,
    hello: action.payload,
  }),
}

export default createReducer(initialState, handlers)
