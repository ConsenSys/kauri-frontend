// @flow
import { Observable } from 'rxjs/Observable'
import { trackMixpanelAction } from '../Link/Module'
import { showNotificationAction } from '../../../lib/Module'
import { checkpointArticles } from '../../../queries/Article'

import type { Dependencies } from '../../../lib/Module'

const CHECKPOINT_ARTICLES = 'CHECKPOINT_ARTICLES'

type CheckpointArticlesAction = {
  type: string,
}

type CheckpointArticlesCommandOutput = {
  merkleRoot: string,
  checkpointHash: string,
  signatureV: string,
  signatureR: string,
  signatureS: string,
}

type CheckpointArticlesCommandResponse = { data: { output: CheckpointArticlesCommandOutput } }

export const checkpointArticlesAction: () => CheckpointArticlesAction = () => ({
  type: CHECKPOINT_ARTICLES,
})

export const checkpointArticlesEpic = (
  action$: Observable<CheckpointArticlesAction>,
  { dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, getGasPrice }: Dependencies
) =>
  action$.ofType(CHECKPOINT_ARTICLES).switchMap((action: CheckpointArticlesAction) =>
    Observable.fromPromise(
      apolloClient.mutate({
        mutation: checkpointArticles,
        variables: {},
      })
    )
      .flatMap(({ data: { checkpointArticles: { hash } } }) => Observable.fromPromise(apolloSubscriber(hash)))
      .do(h => console.log(h))
      .switchMap(
        ({
          data: {
            output: { merkleRoot, checkpointHash, signatureV, signatureR, signatureS },
          },
        }: CheckpointArticlesCommandResponse) =>
          Observable.fromPromise(getGasPrice())
            .mergeMap(gasPrice =>
              smartContracts().KauriCore.checkpointArticles.sendTransaction(
                merkleRoot,
                checkpointHash,
                signatureV,
                signatureR,
                signatureS,
                {
                  from: web3.eth.accounts[0],
                  value: 0,
                  gas: 250000,
                  gasPrice,
                }
              )
            )
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
                    resource: 'articles',
                    resourceID: 'all',
                    resourceAction: 'checkpoint articles transaction submitted',
                    transactionHash,
                  },
                })
              )
            })
            .mergeMap((transactionHash: string) => apolloSubscriber(transactionHash, 'ArticlesCheckpointed'))
            .do(() => apolloClient.resetStore())
            .mapTo(
              showNotificationAction({
                notificationType: 'success',
                message: 'Articles checkpointed!',
                description: `All Kauri platform articles are now on the Mainnet!`,
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
  )
