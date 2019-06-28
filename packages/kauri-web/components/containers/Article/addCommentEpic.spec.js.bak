import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import contract from 'truffle-contract'
import Web3 from 'web3'
import config from '../../../config'
import initApollo from '../../../lib/init-apollo'
import { createRequest } from '../../../queries/Request'
import { cancelRequestAction, cancelRequestEpic } from './Module'

const KauriCoreArtifact = require(config.default.KauriCoreArtifact)

const testEpic = (epic, action, state = {}, dependencies = {}) => {
  const actions = new Subject()
  const actions$ = new ActionsObservable(actions)
  const store = { getState: () => state }

  const promised = epic(actions$, store, dependencies)
    .toArray()
    .toPromise()

  if (action.length) {
    action.map(act => actions.next(act))
    actions.complete()
  } else {
    actions.next(action)
    actions.complete()
  }

  return promised
}

describe.skip('cancelRequest epic', () => {
  let KauriCore
  it(
    'should call graphql and the smart contract',
    async () => {
      KauriCore = contract(KauriCoreArtifact)
      const web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.gethBlockchain}`))
      KauriCore.setProvider(web3.currentProvider)
      KauriCore = await KauriCore.deployed()
      const apolloClient = initApollo(
        {},
        {
          getToken: () =>
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIweDMxYjI2ZTQzNjUxZTkzNzFjODhhZjNkMzZjMTRjZmQ5MzhiYWY0ZmQiLCJleHAiOjE4MjQ4MDk5NjUsImlzcyI6ImZsb3ciLCJpYXQiOjE1MDk0NDk5NjV9.E_nIPG9r0RxwT4yCJywXRy1okGjMCYFwBECqpFvcuI0kyQw2xC6PA1ohPDbPU8SQ4Agkbg6I3Fs9TkBb14PR7w',
        }
      )
      const {
        data: {
          createRequest: { request_id },
        },
      } = await apolloClient.mutate({
        mutation: createRequest({ bounty: 0.1, subject: 'Hello world!', text: 'lol', category: 'metamask' }),
      })
      const sourceAction = cancelRequestAction({ request_id })
      const expectedActions = [
        {
          type: 'SHOW_NOTIFICATION',
          notificationType: 'info',
          message: 'Request cancellation in progress',
          description: expect.any(String),
        },
      ]
      const resultingActions = await testEpic(cancelRequestEpic, sourceAction, null, {
        web3,
        apolloClient,
        smartContracts: () => ({ KauriCore }),
      })

      expect(resultingActions).toEqual(expectedActions)
    },
    500000
  )
})
