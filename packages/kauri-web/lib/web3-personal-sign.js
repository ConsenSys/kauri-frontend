import { Observable } from 'rxjs'
import { showNotificationAction } from './Module'
import apolloClient from './init-apollo'
import apolloSubscriber from './apollo-subscriber'

const personalSign = data =>
  new Promise((resolve, reject) => {
    const web3 = global.window && global.window.web3
    if (web3.eth.accounts && web3.eth.accounts.length < 1) reject(new Error('Metamask locked!'))

    web3.currentProvider.sendAsync(
      {
        id: new Date().getTime(),
        jsonrpc: '2.0',
        method: 'personal_sign',
        params: [web3.eth.accounts[0], web3.toHex(data)],
      },
      (err, { result }) => {
        console.log('err', err)
        console.log('result', result)
        return err || !result ? reject(err) : resolve(result)
      }
    )
  })

const loginPersonalSign = data =>
  Observable.fromPromise(personalSign(data)).catch(err => {
    console.error(err)
    if (err.message.includes('Metamask locked!')) {
      return Observable.throw(new Error('Metamask locked!'))
    }
    return Observable.throw(new Error('Submission error'))
  })

const web3PersonalSign = (id, data, gqlMutation) =>
  window.web3.eth.accounts.length > 0
    ? Observable.fromPromise(personalSign(data))
      .flatMap(signature =>
        apolloClient().mutate({
          mutation: gqlMutation,
          variables: {
            id,
            signature,
          },
        })
      )
      .flatMap(({ data }) => apolloSubscriber(data[gqlMutation.definitions['0'].name.value].hash))
      .catch(err => {
        console.error(err)
        if (err.message.includes('Metamask locked!')) {
          return Observable.throw(new Error('Metamask locked!'))
        }
        return Observable.throw(new Error('Submission error'))
      })
    : Observable.of(
      showNotificationAction({
        notificationType: 'error',
        message: 'Your wallet is locked!',
        description: 'Please unlock your wallet!',
      })
    )

export default web3PersonalSign
export { loginPersonalSign, personalSign }
