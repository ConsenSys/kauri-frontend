// @flow
import { Observable } from 'rxjs/Observable'
import { showNotificationAction } from '../../../../lib/Module'
import { trackMixpanelAction } from '../../Link/Module'
import {
  checkpointArticles,
} from '../../../../queries/Article'

import type { Dependencies } from '../../../../lib/Module'

const CHECKPOINT_ARTICLES = 'CHECKPOINT_ARTICLES'

type CheckpointArticlesAction = {
  type: string
}

type CheckpointArticlesCommandOutput = {
  merkleRoot: string,
  checkpointHash: string,
  signatureV: string,
  signatureR: string,
  signatureS: string
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
  action$
    .ofType(CHECKPOINT_ARTICLES)
    .switchMap((action: CheckpointArticlesAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: checkpointArticles,
          variables: {
          },
        })
      )
        .flatMap(({ data: { checkpointArticles: { hash } } }) =>
          Observable.fromPromise(apolloSubscriber(hash))
        )
        .do(h => console.log(h))
        .switchMap(({ data: { output: { merkleRoot, checkpointHash, signatureV, signatureR, signatureS } } }: CheckpointArticlesCommandResponse) =>
          Observable.fromPromise(getGasPrice())
            .mergeMap(gasPrice => smartContracts().KauriCore.checkpointArticles.sendTransaction(
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
            ))
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
                description: `What a legend!`,
              })
            )
        )
    )
