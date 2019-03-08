import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import gql from "graphql-tag";
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
} from "./__generated__/createCommunity";
import {
  updateCommunity,
  updateCommunityVariables,
} from "./__generated__/updateCommunity";

export const createCommunityMutation = gql`
  mutation createCommunity(
    $name: String
    $description: String
    $avatar: String
    $website: String
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    createCommunity(
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
    ) {
      hash
    }
  }
`;

export const updateCommunityMutation = gql`
  mutation updateCommunity(
    $id: String
    $name: String
    $description: String
    $avatar: String
    $website: String
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    createCommunity(
      id: $id
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
    ) {
      hash
    }
  }
`;

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
        .mergeMap(({ data: { createCommunity: result } }) =>
          apolloSubscriber<ICreateCommunityCommandOutput>(result.hash)
        )
        .do(() => typeof actions.callback === "function" && actions.callback())
        .mergeMap(({ data: { output: { id } } }) =>
          Observable.merge(
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
        .mergeMap(({ data: { createCommunity: result } }) =>
          apolloSubscriber<IUpdateCommunityCommandOutput>(result.hash)
        )
        .do(() => typeof actions.callback === "function" && actions.callback())
        .mergeMap(({ data: { output: { id } } }) =>
          Observable.merge(
            Observable.of(
              (showNotificationAction as any)({
                description: `woo woo`,
                message: "Community updated",
                notificationType: "success",
              })
            ),
            Observable.of(
              routeChangeAction(`/community/${id}/community-updated`)
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
