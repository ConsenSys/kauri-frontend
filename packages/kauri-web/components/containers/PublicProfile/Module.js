import { Observable } from 'rxjs/Observable';
import { saveUserDetails } from '../../../queries/User';
import { showNotificationAction, routeChangeAction } from '../../../lib/Module';

export const saveUserDetailsAction = (payload) => ({
    type: "SAVE_USER_DETAILS",
    payload,
  });

  export const saveUserDetailsEpic = (
    action$,
    _,
    { apolloClient, smartContracts, web3, apolloSubscriber }
  ) =>
    action$
      .ofType("SAVE_USER_DETAILS")
      .switchMap(({ payload: { username, title, email, avatar, website } }) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: saveUserDetails,
            variables: {
              username,
              email,
              avatar,
              website,
              title
            },
          })
        ).catch(err => {
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