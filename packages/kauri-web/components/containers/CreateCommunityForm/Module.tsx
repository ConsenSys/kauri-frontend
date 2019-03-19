import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import {
  IReduxState,
  IDependencies,
  IAction,
  showNotificationAction,
  Actions,
} from "../../../lib/Module";
import {
  createCommunity,
  createCommunityVariables,
} from "../../../queries/__generated__/createCommunity";
import {
  updateCommunity,
  updateCommunityVariables,
} from "../../../queries/__generated__/updateCommunity";
import {
  createCommunityMutation,
  updateCommunityMutation,
} from "../../../queries/Community";

export interface ICreateCommunityAction extends IAction {
  callback: () => void;
  payload: createCommunityVariables;
  type: "CREATE_COMMUNITY";
}

export interface IUpdateCommunityAction extends IAction {
  callback: () => void;
  payload: updateCommunityVariables;
  type: "UPDATE_COMMUNITY";
}

const CREATE_COMMUNITY = "CREATE_COMMUNITY";

const UPDATE_COMMUNITY = "UPDATE_COMMUNITY";

export const createCommunityAction = (
  payload: createCommunityVariables,
  callback: () => void
): ICreateCommunityAction => ({
  callback,
  payload,
  type: CREATE_COMMUNITY,
});

export const updateCommunityAction = (
  payload: updateCommunityVariables,
  callback: () => void
): IUpdateCommunityAction => ({
  callback,
  payload,
  type: UPDATE_COMMUNITY,
});

interface ICreateCommunityCommandOutput {
  id: string;
  error: string | undefined;
}

type IUpdateCommunityCommandOutput = ICreateCommunityCommandOutput;

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
        .mergeMap(({ data: { output: { // id,
              error } } }) =>
          error
            ? Observable.throw(new Error("Submission error"))
            : Observable.merge(
                Observable.of(
                  (showNotificationAction as any)({
                    description: `woo woo`,
                    message: "Community Created",
                    notificationType: "success",
                  })
                )
                // Observable.of(
                //   routeChangeAction(`/community/${id}/community-created`)
                // )
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

export const updateCommunityEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(UPDATE_COMMUNITY)
    .switchMap(actions =>
      Observable.fromPromise(
        apolloClient.mutate<updateCommunity, updateCommunityVariables>({
          mutation: updateCommunityMutation,
          variables: (actions as IUpdateCommunityAction).payload,
        })
      )
        .do(console.log)
        .mergeMap(({ data: { createCommunity: result } }) =>
          apolloSubscriber<IUpdateCommunityCommandOutput>(result.hash)
        )
        .do(console.log)
        .do(() => typeof actions.callback === "function" && actions.callback())
        .mergeMap(({ data: { output: { // id,
              error } } }) =>
          error
            ? Observable.throw(new Error("Submission error"))
            : Observable.merge(
                Observable.of(
                  (showNotificationAction as any)({
                    description: `woo woo`,
                    message: "Community updated",
                    notificationType: "success",
                  })
                )
                // Observable.of(
                //   routeChangeAction(`/community/${id}/community-updated`)
                // )
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
