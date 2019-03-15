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
  approveResource,
  approveResourceVariables,
} from "./__generated__/approveResource";

export const approveResourceMutation = gql`
  mutation approveResource($id: String, $resource: ResourceIdentifierInput) {
    approveResource(id: $id, resource: $resource) {
      hash
    }
  }
`;

export interface IapproveResourceAction extends IAction {
  callback: () => void;
  payload: approveResourceVariables;
  type: "APPROVE_RESOURCE";
}

const APPROVE_RESOURCE = "APPROVE_RESOURCE";

export const approveResourceAction = (
  payload: approveResourceVariables,
  callback: () => void
): IapproveResourceAction => ({
  callback,
  payload,
  type: APPROVE_RESOURCE,
});

interface IApproveResourceCommandOutput {
  id: string;
  error: string | undefined;
}

export const approveResourceEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(APPROVE_RESOURCE)
    .switchMap(actions =>
      Observable.fromPromise(
        apolloClient.mutate<approveResource, approveResourceVariables>({
          mutation: approveResourceMutation,
          variables: (actions as IApproveResourceAction).payload,
        })
      )
        .do(console.log)
        .mergeMap(({ data: { approveResource: result } }) =>
          apolloSubscriber<IApproveResourceCommandOutput>(result.hash)
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
                    message: "Resource approved",
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
