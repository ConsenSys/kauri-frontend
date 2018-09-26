// @flow

import { Observable } from 'rxjs/Observable'
import {
  createCollection,
  composeCollection,
} from '../../../queries/Collection'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'

import type { Dependencies } from '../../../lib/Module'

export type CreateCollectionPayload = {
  name: string,
  background: ?string,
  description: ?string,
  sections: Array<SectionDTO>,
}

type CreateCollectionAction = { type: string, payload: CreateCollectionPayload, callback: any }

const CREATE_COLLECTION: string = 'CREATE_COLLECTION'

export const createCollectionAction = (payload: CreateCollectionPayload, callback: any): CreateCollectionAction => ({
  type: CREATE_COLLECTION,
  payload,
  callback,
})

export const createCollectionEpic = (
  action$: Observable<CreateCollectionAction>,
  { getState, dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, web3PersonalSign, getGasPrice }: Dependencies
) =>
  action$
    .ofType(CREATE_COLLECTION)
    .switchMap(
      ({ payload: { name, background, description, sections }, callback }: CreateCollectionAction) => {
        return Observable.fromPromise(
          apolloClient.mutate({
            mutation: createCollection,
            variables: {
              name,
              background,
              description,
            },
          })
        )
          .flatMap(({ data: { createCollection: { hash } } }) =>
            apolloSubscriber(hash)
          )
          .do(h => console.log(h))
          .switchMap(({ data: { output: { id } } }) =>
            Observable.fromPromise(
              apolloClient.mutate({
                mutation: composeCollection,
                variables: {
                  id,
                  sections,
                },
              })
            )
              .flatMap(({ data: { composeCollection: { hash } } }) =>
                Observable.fromPromise(apolloSubscriber(hash))
              )
              .do(h => console.log(h))
              .flatMap(() => apolloClient.resetStore())
              .mergeMap(() =>
                Observable.of(
                  showNotificationAction({
                    notificationType: 'success',
                    message: 'Collection created!',
                    description: 'Your collection is now available for viewing!',
                  }),
                  routeChangeAction(`/collection/${id}`),
                  trackMixpanelAction({
                    event: 'Offchain',
                    metaData: {
                      resource: 'collection',
                      resourceID: id,
                      resourceVersion: '1',
                      resourceAction: 'create collection',
                    },
                  })
                )
              )
              .do(() => callback && callback())
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
      }
    )
