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
  curateResource,
  curateResourceVariables,
} from "./__generated__/curateResource";

export const curateResourceMutation = gql`
  mutation curateResource($id: String, $resource: ResourceIdentifierInput) {
    curateResource(id: $id, resource: $resource) {
      hash
    }
  }
`;

export interface ICurateResourceAction extends IAction {
  callback: () => void;
  payload: curateResourceVariables;
  type: "CURATE_RESOURCE";
}

const CURATE_RESOURCE = "CURATE_RESOURCE";

export const curateResourceAction = (
  payload: curateResourceVariables,
  callback: () => void
): ICurateResourceAction => ({
  callback,
  payload,
  type: CURATE_RESOURCE,
});

interface ICurateResourceCommandOutput {
  id: string;
  error: string | undefined;
}

export const curateResourceEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(CURATE_RESOURCE)
    .switchMap(actions =>
      Observable.fromPromise(
        apolloClient.mutate<curateResource, curateResourceVariables>({
          mutation: curateResourceMutation,
          variables: (actions as ICurateResourceAction).payload,
        })
      )
        .do(console.log)
        .mergeMap(({ data: { curateResource: result } }) =>
          apolloSubscriber<ICurateResourceCommandOutput>(result.hash)
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
                    message: "Resource curated",
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
