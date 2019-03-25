import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import {
  IReduxState,
  IDependencies,
  IAction,
  showNotificationAction,
  Actions,
  routeChangeAction,
} from "../../../lib/Module";
import {
  createCommunity,
  createCommunityVariables,
} from "../../../queries/__generated__/createCommunity";
import {
  createCommunityMutation,
} from "../../../queries/Community";

export interface ICreateCommunityAction extends IAction {
  payload: {};
  type: "CREATE_COMMUNITY";
}

const CREATE_COMMUNITY = "CREATE_COMMUNITY";

export const createCommunityAction = (
  payload: {},
  callback: () => void
): ICreateCommunityAction => ({
  callback,
  payload,
  type: CREATE_COMMUNITY,
});


interface ICreateCommunityCommandOutput {
  id: string;
  error: string | undefined;
}

export const createCommunityEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(CREATE_COMMUNITY)
    .switchMap(actions =>
      Observable.fromPromise(
        apolloClient.mutate<createCommunity, createCommunityVariables>({
          mutation: createCommunityMutation,
          variables: (actions as ICreateCommunityAction).payload,
        })
      )
        .do(console.log)
        .mergeMap(({ data: { createCommunity: result } }) =>
          apolloSubscriber<ICreateCommunityCommandOutput>(result.hash)
        )
        .do(console.log)
        .do(() => typeof actions.callback === "function" && actions.callback())
        .mergeMap(({ data: { output: { id, error } } }) =>
          error
            ? Observable.throw(new Error("Submission error"))
            : Observable.merge(
                Observable.of(
                  (showNotificationAction as any)({
                    description: `woo woo`,
                    message: "Community Created",
                    notificationType: "success",
                  })
                ),
                Observable.of(
                  routeChangeAction(`/community/${id}/community-created`)
                )
              )
        )
        .do(() => apolloClient.resetStore())
        .catch(err => {
          console.error(err);
          return Observable.of(
            showNotificationAction({
              description: "Please try again",
              message: "Submission error",
              notificationType: "error",
            })
          );
        })
    )
    .catch(err => {
      console.error(err);
      return Observable.of(
        showNotificationAction({
          description: "Please try again",
          message: "Submission error",
          notificationType: "error",
        })
      );
    });