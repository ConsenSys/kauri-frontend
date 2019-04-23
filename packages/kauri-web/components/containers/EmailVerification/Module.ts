import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import {
  IReduxState,
  IDependencies,
  showNotificationAction,
} from "../../../lib/Module";
import { create } from "../../../lib/init-apollo";
import { getEvent } from "../../../queries/Module";
import {
  verifyEmail as verifyEmailMutation,
  emailSubscribe as emailSubscribeMutation,
  regenerateEmailVerificationCode,
} from "../../../queries/User";
import { verifyEmail } from "../../../queries/__generated__/verifyEmail";
import {
  emailSubscribe,
  emailSubscribeVariables,
} from "../../../queries/__generated__/emailSubscribe";

interface IVerifyEmailAction {
  callback: any;
  code: string;
  type: "VERIFY_EMAIL";
}

const VERIFY_EMAIL = "VERIFY_EMAIL";

const EMAIL_SUBSCRIBE = "EMAIL_SUBSCRIBE";

export const emailSubscribeAction = (
  emailAddress: string,
  callback: any
): IEmailSubscribeAction => ({
  callback,
  emailAddress,
  type: EMAIL_SUBSCRIBE,
});

export const verifyEmailAction = (
  code: string,
  callback: any
): IVerifyEmailAction => ({
  callback,
  code,
  type: VERIFY_EMAIL,
});

export const emailVerifiedAction = () => ({
  type: "EMAIL_VERIFIED",
});

export const emailVerificationFail = () => ({
  type: "EMAIL_VERIFICATION_FAIL",
});

export const resendEmailVerificationAction = () => ({
  type: "SEND_EMAIL_VERIFICATION",
});

export const emailSubscribedAction = () => ({
  type: "EMAIL_SUBSCRIBED",
});

export const emailSubscribedFail = () => ({
  type: "EMAIL_SUBSCRIBE_FAIL",
});

interface IVerifyEmailOutput {
  childHashes: string[];
}

interface IEmailSubscribeAction {
  callback: any;
  emailAddress: string;
  type: "EMAIL_SUBSCRIBE";
}

interface IEmailSubscribeOutput {
  commandResult: string;
}

export const emailSubscribeEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  { getState },
  { apolloClient }
) =>
  action$
    .ofType(EMAIL_SUBSCRIBE)
    .switchMap(({ emailAddress }: IEmailSubscribeAction) =>
      Observable.fromPromise(
        apolloClient.mutate<emailSubscribe, emailSubscribeVariables>({
          mutation: emailSubscribeMutation,
          variables: {
            emailAddress,
            subscriptions: { newsletter: true },
          },
        })
      )
        .mergeMap(({ data: { subscribe: { hash } } }) =>
          Observable.fromPromise(
            new Promise<{ data: { output: IEmailSubscribeOutput } }>(
              (resolve, reject) => {
                create(
                  {},
                  {
                    getToken: () => "DUMMYVERIFICATIONTOKEN",
                    hostName: getState().app.hostName,
                  }
                )
                  .subscribe({
                    query: getEvent,
                    variables: { hash },
                  })
                  .subscribe({
                    error: (err: Error) => reject(err),
                    next: (data: {
                      data: {
                        output: IEmailSubscribeOutput;
                      };
                    }) => resolve(data),
                  });
              }
            )
          )
        )
        .do(() => apolloClient.resetStore())
        .mergeMap(({ data: { output } }) =>
          output && output.commandResult
            ? Observable.of(
                showNotificationAction({
                  description:
                    "Please check your email inbox and confirm email newsletter subscription!",
                  message: "Confirm your email newsletter subscription",
                  notificationType: "success",
                })
              )
            : Observable.of(emailVerificationFail())
        )
    );

export const verifyEmailEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  { getState },
  { apolloClient }
) =>
  action$
    .ofType(VERIFY_EMAIL)
    .switchMap(({ code, callback }: IVerifyEmailAction) =>
      Observable.fromPromise(
        apolloClient.mutate<verifyEmail>({
          mutation: verifyEmailMutation,
          variables: {
            code,
          },
        })
      )
        .mergeMap(({ data: { verifyEmail: { hash } } }) =>
          Observable.fromPromise(
            new Promise<{ data: { output: IVerifyEmailOutput } }>(
              (resolve, reject) => {
                create(
                  {},
                  {
                    getToken: () => "DUMMYVERIFICATIONTOKEN",
                    hostName: getState().app.hostName,
                  }
                )
                  .subscribe({
                    query: getEvent,
                    variables: { hash },
                  })
                  .subscribe({
                    error: (err: Error) => reject(err),
                    next: (data: {
                      data: {
                        output: IVerifyEmailOutput;
                      };
                    }) => resolve(data),
                  });
              }
            )
          )
        )
        .mergeMap(({ data: { output } }) =>
          output && output.childHashes
            ? Observable.forkJoin(
                output.childHashes.map(
                  hash =>
                    new Promise((resolve, reject) =>
                      create(
                        {},
                        {
                          getToken: () => "DUMMYVERIFICATIONTOKEN",
                          hostName: getState().app.hostName,
                        }
                      )
                        .subscribe({
                          query: getEvent,
                          variables: { hash },
                        })
                        .subscribe({
                          error: (err: Error) => reject(err),
                          next: (data: {
                            data: {
                              output: { hash: string };
                            };
                          }) => resolve(data),
                        })
                    )
                )
              )
                .map(() => emailVerifiedAction())
                .do(() => apolloClient.resetStore())
            : Observable.of(emailVerificationFail())
        )
        .do(callback)
    );

export const resendEmailVerificationEpic: Epic<
  any,
  IReduxState,
  IDependencies
> = (actions$, _, { apolloClient }) =>
  actions$.ofType("SEND_EMAIL_VERIFICATION").flatMap(() =>
    Observable.fromPromise(
      apolloClient.mutate<any>({
        mutation: regenerateEmailVerificationCode,
      })
    ).mergeMap(() =>
      Observable.of(
        showNotificationAction({
          description: "Verification email sent!",
          message: "Email sent",
          notificationType: "success",
        })
      )
    )
  );
