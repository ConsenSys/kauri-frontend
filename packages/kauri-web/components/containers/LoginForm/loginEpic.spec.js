import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import Web3 from 'web3'
import config from '../../../config'
import fetch from 'isomorphic-unfetch'
import { registerEpic, registerAction } from './Module'

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

describe.skip('login epic', () => {
  it(
    'should request a signature sign, request an auth token and trigger a notification and redirect to the homepage',
    async () => {
      const email = 'ericjohn.juta@consensys.net`'
      const userId = '0xb94C61caAe9b69A608EeD2E50C967896deD03435'
      const nickname = 'rej156'
      const sourceAction = registerAction(
        {
          email,
          userId,
          nickname,
        },
        () => {}
      )
      const expectedActions = [
        {
          type: 'SHOW_NOTIFICATION',
          notificationType: 'success',
          message: 'Register success',
          description: 'All set! Time to write an article!',
        },
        {
          type: 'ROUTE_CHANGE',
          payload: '/my-requests',
        },
      ]
      const web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.gethBlockchain}`))
      const resultingActions = await testEpic(registerEpic, sourceAction, null, {
        web3,
        fetch,
      })

      expect(resultingActions).toEqual(expectedActions)
    },
    500000
  )
})
