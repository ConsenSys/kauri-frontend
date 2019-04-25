import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import {
  IReduxState,
  IDependencies,
  IAction,
  showNotificationAction,
  routeChangeAction,
  Actions,
} from "../../../lib/Module";
import {
  createCommunity,
  createCommunityVariables,
} from "../../../queries/__generated__/createCommunity";
import {
  prepareCreateCommunity,
  prepareCreateCommunityVariables,
} from "../../../queries/__generated__/prepareCreateCommunity";
import {
  updateCommunity,
  updateCommunityVariables,
} from "../../../queries/__generated__/updateCommunity";
import {
  createCommunityMutation,
  prepareCreateCommunityQuery,
} from "../../../queries/Community";

export interface ICreateCommunityAction extends IAction {
  callback: () => void;
  payload: createCommunityVariables;
  type: "CREATE_COMMUNITY";
}

interface IPrepareCreateCommunityAction extends IAction {
  callback: () => void;
  payload: prepareCreateCommunityVariables;
  type: "PREPARE_CREATE_COMMUNITY";
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

interface IPrepareCreateCommunityCommandOutput {
  messageHash: string;
  error: string | undefined;
}

type IUpdateCommunityCommandOutput = ICreateCommunityCommandOutput;

export const createCommunityEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber, personalSign }
) =>
  action$
    .ofType(CREATE_COMMUNITY)
    .switchMap(actions =>
      Observable.fromPromise(
        apolloClient.query<
          prepareCreateCommunity,
          prepareCreateCommunityVariables
        >({
          query: prepareCreateCommunityQuery,
          variables: (actions as IPrepareCreateCommunityAction).payload,
        })
      )
        .do(console.log)
        .mergeMap<any, string>(
          ({ data: { prepareCreateCommunity: result } }) =>
            result && personalSign(result.messageHash)
        )
        .mergeMap(signature =>
          apolloClient.mutate<createCommunity, createCommunityVariables>({
            mutation: createCommunityMutation,
            variables: {
              ...(actions as ICreateCommunityAction).payload,
              signature,
            },
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
                    description: `You can start adding articles and collections to your community page once the transaction is mined!`,
                    message: "Creating Community",
                    notificationType: "info",
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
