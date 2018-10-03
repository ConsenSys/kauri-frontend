// @flow
import { Observable } from 'rxjs/Observable';
import { saveUserDetails } from '../../../queries/User';
import { showNotificationAction, routeChangeAction } from '../../../lib/Module';
import { trackMixpanelAction } from '../Link/Module';
import type { Dependencies } from '../../../lib/Module';
import type { HeaderState } from './types';

export type SaveUserDetailActionType = {
  type: string,
  payload: HeaderState,
};
export const saveUserDetailsAction = (payload: HeaderState) => ({
  type: 'SAVE_USER_DETAILS',
  payload,
});

export const saveUserDetailsEpic = (
  action$: Observable<SaveUserDetailActionType>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType('SAVE_USER_DETAILS')
    .switchMap(({ payload: { username, title, avatar, website, name, twitter = '', github = '' } }) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: saveUserDetails,
          variables: {
            username,
            avatar,
            website,
            title,
            name,
            social: {
              twitter,
              github,
            },
          },
        }
        ))
        .do(h => process.env.NODE_ENV === 'development' && console.log({ username, title, avatar, website, name, twitter, github }))
        .mergeMap(({ data: { saveUser: { hash } } }: { data: { saveUser: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .mergeMap(({ data: { output } }) => {
          if (typeof output.error === 'string') {
            return Observable.throw(output.error)
          } else {
            return Observable.of({ type: 'UPDATE_USER_SUCCESS' })
              .do(h => console.log(h))
              .do(() => apolloClient.resetStore())
              .do(
                () => trackMixpanelAction({
                  event: 'Offchain',
                  metaData: {
                    resource: 'profile',
                    resourceAction: 'update profile',
                    resourceID: getState().app.user.id,
                  },
                })
              )
          }
        })
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
