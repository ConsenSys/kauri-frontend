import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import R from "ramda";
import {
  IReduxState,
  IDependencies,
  showNotificationAction,
} from "../../../lib/Module";
import { curateCommunityResourcesMutation } from "../../../queries/Community";
import {
  curateCommunityResources,
  curateCommunityResourcesVariables,
} from "../../../queries/__generated__/curateCommunityResources";
import { approveResourceMutation } from "../../../queries/Community";
import {
  approveResource,
  approveResourceVariables,
} from "../../../queries/__generated__/approveResource";

interface ICurateCommunityResourcesAction {
  type: "CURATE_COMMUNITY_RESOURCES";
  payload: curateCommunityResourcesVariables;
}

interface IApproveResourceAction {
  type: "APPROVE_RESOURCE";
  payload: approveResourceVariables;
}

const CURATE_COMMUNITY_RESOURCES = "CURATE_COMMUNITY_RESOURCES";
const APPROVE_RESOURCE = "APPROVE_RESOURCE";

export const curateCommunityResourcesAction = (
  payload: curateCommunityResourcesVariables
): ICurateCommunityResourcesAction => ({
  payload,
  type: CURATE_COMMUNITY_RESOURCES,
});

export const approveResourceAction = (
  payload: approveResourceVariables
): IApproveResourceAction => ({
  payload,
  type: APPROVE_RESOURCE,
});

interface ICurateCommunityResourcesOutput {
  id: string;
  error?: string;
}

type IApproveResourceCommandOutput = ICurateCommunityResourcesOutput;

const capitalize = (s: string) =>
  R.compose(
    R.toUpper,
    R.head
  )(s) + R.tail(s);

export const curateCommunityResourcesEpic: Epic<
  any,
  IReduxState,
  IDependencies
> = (action$, _, { apolloClient, apolloSubscriber }) =>
  action$
    .ofType(CURATE_COMMUNITY_RESOURCES)
    .switchMap(({ payload }: ICurateCommunityResourcesAction) =>
      Observable.fromPromise(
        apolloClient.mutate<
          curateCommunityResources,
          curateCommunityResourcesVariables
        >({
          mutation: curateCommunityResourcesMutation,
          variables: payload,
        })
      )
        .mergeMap(({ data: { curateResources: { hash } } }) =>
          apolloSubscriber<ICurateCommunityResourcesOutput>(hash)
        )
        .mergeMap(({ data: { output: { error } } }) =>
          error
            ? Observable.of(
                showNotificationAction({
                  description: "Please try again",
                  message: "Submission Error",
                  notificationType: "error",
                })
              )
            : Observable.of(
                showNotificationAction({
                  description: `They have been proposed to the community!`,
                  message: `${payload.resources &&
                    capitalize(
                      (payload.resources[0] as {
                        type: string;
                      }).type.toLowerCase()
                    )}s curated!`,
                  notificationType: "success",
                })
              )
        )
        .do(() => apolloClient.resetStore())
    );

export const approveResourceEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(APPROVE_RESOURCE)
    .switchMap(({ payload }: IApproveResourceAction) =>
      Observable.fromPromise(
        apolloClient.mutate<approveResource, approveResourceVariables>({
          mutation: approveResourceMutation,
          variables: payload,
        })
      )
        .mergeMap(({ data: { approveResource: { hash } } }) =>
          apolloSubscriber<IApproveResourceCommandOutput>(hash)
        )
        .mergeMap(({ data: { output: { error } } }) =>
          error
            ? Observable.of(
                showNotificationAction({
                  description: "Please try again",
                  message: "Submission Error",
                  notificationType: "error",
                })
              )
            : Observable.of(
                showNotificationAction({
                  description: `The proposed resource has been added to the community`,
                  message: `Resource approved`,
                  notificationType: "success",
                })
              )
        )
        .do(() => apolloClient.resetStore())
    );
