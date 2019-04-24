import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import {
  IReduxState,
  IDependencies,
  showNotificationAction,
} from "../../../lib/Module";
import { create } from "../../../lib/init-apollo";
import { curateCommunityResourceMutation } from "../../../queries/Community";
import {
  curateCommunityResource,
  curateCommunityResourceVariables,
} from "../../../queries/__generated__/curateCommunityResource";

interface ICurateCommunityResourceAction {
  type: "CURATE_COMMUNITY_RESOURCE";
  payload: curateCommunityResourceVariables;
}

const CURATE_COMMUNITY_RESOURCE = "CURATE_COMMUNITY_RESOURCE";

export const curateCommunityResourceAction = (
  payload: curateCommunityResourceVariables
): ICurateCommunityResourceAction => ({
  payload,
  type: CURATE_COMMUNITY_RESOURCE,
});

interface ICurateCommunityResourceOutput {
  id: string;
  error?: string;
}

export const curateCommunityResourceEpic: Epic<
  any,
  IReduxState,
  IDependencies
> = (action$, _, { apolloClient, apolloSubscriber }) =>
  action$
    .ofType(CURATE_COMMUNITY_RESOURCE)
    .switchMap(({ payload }: ICurateCommunityResourceAction) =>
      Observable.fromPromise(
        apolloClient.mutate<
          curateCommunityResource,
          curateCommunityResourceVariables
        >({
          mutation: curateCommunityResourceMutation,
          variables: payload,
        })
      )
        .mergeMap(({ data: { subscribe: { hash } } }) =>
          apolloSubscriber<ICurateCommunityResourceOutput>(hash)
        )
        .mergeMap(({ data: { output: { id, error } } }) =>
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
                  description: "Resource has been proposed to the community",
                  message: "Resource curated/proposed!",
                  notificationType: "success",
                })
              )
        )
        .do(() => apolloClient.resetStore())
    );
