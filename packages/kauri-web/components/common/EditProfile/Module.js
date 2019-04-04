import { Observable } from "rxjs/Observable";
import { saveUserDetails, getOwnProfile } from "../../../queries/User";
import { showNotificationAction, routeChangeAction } from "../../../lib/Module";
import type { Dependencies } from "../../../lib/Module";
import type { HeaderState } from "./types";
import analytics from "../../../lib/analytics";

export type SaveUserDetailActionType = {
  type: string,
  payload: HeaderState,
  callback: any,
};

export const saveUserDetailsAction = (
  payload: HeaderState,
  callback?: any
) => ({
  type: "SAVE_USER_DETAILS",
  payload,
  callback,
});

export const saveUserDetailsEpic = (
  action$: Observable<SaveUserDetailActionType>,
  { getState }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType("SAVE_USER_DETAILS")
    .switchMap(
      ({
        payload: {
          username,
          title,
          avatar,
          website,
          email,
          name,
          twitter,
          github,
          subscriptions,
          redirectURL,
        },
        callback,
      }) =>
        Observable.fromPromise(
          apolloClient.mutate({
            mutation: saveUserDetails,
            variables: {
              username,
              avatar,
              website,
              email,
              title,
              name,
              social: (twitter || github) && {
                twitter,
                github,
              },
              subscriptions,
            },
          })
        )
          .do(() => callback && callback(true))
          .mergeMap(
            ({
              data: {
                saveUser: { hash },
              },
            }: {
              data: { saveUser: { hash: string } },
            }) => apolloSubscriber(hash)
          )
          .mergeMap(({ data: { output } }) => {
            if (typeof output.error === "string") {
              return Observable.throw(output.error);
            } else {
              return Observable.of({ type: "UPDATE_USER_SUCCESS" })
                .do(() =>
                  analytics.track("Edit Profile", {
                    category: "user_actions",
                  })
                )
                .do(() => callback && callback(false))
                .mergeMap(() =>
                  apolloClient.query({
                    query: getOwnProfile,
                    variables: {},
                    fetchPolicy: "network-only",
                  })
                )
                .mergeMap(() => {
                  let newRedirectURL;
                  if (typeof redirectURL === "string") {
                    newRedirectURL =
                      redirectURL.indexOf("https://") !== -1
                        ? redirectURL + "?redirected=true"
                        : redirectURL;
                  } else {
                    newRedirectURL = `/public-profile/${
                      getState().app.user.id
                    }`;
                  }

                  return Observable.merge(
                    Observable.of(routeChangeAction(newRedirectURL)),
                    Observable.of(
                      showNotificationAction({
                        notificationType: "success",
                        message: "Submission Successful",
                        description:
                          "You have successfully updated your profile",
                      })
                    )
                  ).catch(err => {
                    console.error(err);
                    return Observable.of(
                      showNotificationAction({
                        notificationType: "error",
                        message: "Submission error",
                        description: "Please try again",
                      })
                    );
                  });
                });
            }
          })
          .catch(err => {
            console.error(err);
            const notificationPayload = err.includes("already uses this email")
              ? {
                  notificationType: "error",
                  message: "Submission error",
                  description: "A user already uses this email!",
                }
              : {
                  notificationType: "error",
                  message: "Submission error",
                  description: "Please try again",
                };
            return Observable.of(showNotificationAction(notificationPayload));
          })
    );
