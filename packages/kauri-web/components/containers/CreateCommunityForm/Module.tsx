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
  prepareSendInvitation,
  prepareSendInvitationVariables,
} from "../../../queries/__generated__/prepareSendInvitation";
import {
  sendInvitation,
  sendInvitationVariables,
} from "../../../queries/__generated__/sendInvitation";
import {
  createCommunityMutation,
  updateCommunityMutation,
  prepareCreateCommunityQuery,
  prepareSendInvitationQuery,
  sendInvitationMutation,
} from "../../../queries/Community";
import { ApolloQueryResult } from "apollo-client";
import { CommunityPermissionInput } from "../../../__generated__/globalTypes";

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

export interface IInvitationsPayload {
  payload: {
    invitations: Array<{
      email: string;
      role: CommunityPermissionInput;
      secret: string;
    }>;
  };
}

export interface IUpdateCommunityAction extends IAction {
  callback: () => void;
  payload: updateCommunityVariables & IInvitationsPayload;
  type: "UPDATE_COMMUNITY";
}

interface ICommunityCreatedPayload {
  transactionHash: string;
}

export interface ICommunityCreatedAction extends IAction {
  payload: ICommunityCreatedPayload;
  type: "COMMUNITY_CREATED";
}

export interface ICommunityUpdatedAction extends IAction {
  payload: {};
  type: "COMMUNITY_UPDATED";
}

const CREATE_COMMUNITY = "CREATE_COMMUNITY";

const COMMUNITY_CREATED = "COMMUNITY_CREATED";
const COMMUNITY_UPDATED = "COMMUNITY_UPDATED";

const UPDATE_COMMUNITY = "UPDATE_COMMUNITY";

export const createCommunityAction = (
  payload: createCommunityVariables,
  callback: () => void
): ICreateCommunityAction => ({
  callback,
  payload,
  type: CREATE_COMMUNITY,
});

const communityCreatedAction = (
  payload: ICommunityCreatedPayload
): ICommunityCreatedAction => ({
  payload,
  type: COMMUNITY_CREATED,
});

const communityUpdatedAction = (): ICommunityUpdatedAction => ({
  payload: {},
  type: COMMUNITY_UPDATED,
});

export const updateCommunityAction = (
  payload: updateCommunityVariables & IInvitationsPayload,
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

export interface IPrepareSendInvitationQueryResult {
  messageHash: string;
  attributes: {
    secret: string;
  };
}

export interface ISendInvitationCommandOutput {
  hash: string;
}

type IUpdateCommunityCommandOutput = ICreateCommunityCommandOutput;

export const communityCreatedEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloSubscriber }
) =>
  action$
    .ofType(COMMUNITY_CREATED)
    .switchMap((action: ICommunityCreatedAction) =>
      Observable.fromPromise(
        apolloSubscriber(action.payload.transactionHash, "GroupCreated")
      )
        .do(console.log)
        .mergeMap(({ data: { output: { error } } }) =>
          error
            ? Observable.throw(new Error("Submission error"))
            : Observable.of(
                showNotificationAction({
                  description: `Your community has been created! You can start adding articles and collections now!`,
                  message: "Community Created",
                  notificationType: "success",
                })
              )
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
        .switchMap<ApolloQueryResult<prepareCreateCommunity>, any>(
          ({
            data: { prepareCreateCommunity: prepareCreateCommunityResult },
          }) =>
            Observable.fromPromise<string>(
              prepareCreateCommunityResult &&
                personalSign(prepareCreateCommunityResult.messageHash)
            )
              .mergeMap(signature =>
                apolloClient.mutate<createCommunity, createCommunityVariables>({
                  mutation: createCommunityMutation,
                  variables: {
                    ...(actions as ICreateCommunityAction).payload,
                    invitations:
                      prepareCreateCommunityResult &&
                      prepareCreateCommunityResult.attributes.invitations,
                    signature,
                  },
                })
              )
              .do(console.log)
              .mergeMap(({ data: { createCommunity: result } }) =>
                apolloSubscriber<ICreateCommunityCommandOutput>(result.hash)
              )
              .do(console.log)
              .do(
                () =>
                  typeof actions.callback === "function" && actions.callback()
              )
              .mergeMap(
                ({
                  data: {
                    output: { id, transactionHash, error },
                  },
                }) =>
                  error
                    ? Observable.throw(new Error("Submission error"))
                    : Observable.merge(
                        Observable.of(
                          (showNotificationAction as any)({
                            description: `Your community is being created! Once this is completed (within a few minutes), you will be able to add articles and collections`,
                            message: "Creating Community",
                            notificationType: "info",
                          })
                        ),
                        Observable.of(
                          communityCreatedAction({
                            transactionHash,
                          })
                        ),
                        Observable.of(
                          routeChangeAction(
                            `/community/${id}/community-created`
                          )
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
  { apolloClient, apolloSubscriber, personalSign }
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
        .do(() => console.log(actions.payload))
        .do(console.log)
        .mergeMap(({ data: { editCommunity: result } }) =>
          apolloSubscriber<IUpdateCommunityCommandOutput>(result.hash)
        )
        .do(console.log)
        .switchMap(() =>
          (actions as IInvitationsPayload).payload.invitations.length
            ? Observable.forkJoin<
                [
                  {
                    data: {
                      prepareSendInvitation: IPrepareSendInvitationQueryResult;
                    };
                  }
                ]
              >(
                (actions as IInvitationsPayload).payload.invitations.map(
                  invitation =>
                    apolloClient.query<
                      prepareSendInvitation,
                      prepareSendInvitationVariables
                    >({
                      query: prepareSendInvitationQuery,
                      variables: {
                        id: (actions as IUpdateCommunityAction).payload.id,
                        invitation,
                      },
                    })
                )
              )
                .do(console.log)
                .mergeMap(prepareSendInvitationsResults =>
                  prepareSendInvitationsResults.map(
                    (
                      { data: { prepareSendInvitation: result } },
                      invitationIndex
                    ) =>
                      Observable.fromPromise<string>(
                        personalSign(result.messageHash)
                      )
                        .mergeMap(signedSignature =>
                          apolloClient.mutate<
                            sendInvitation,
                            sendInvitationVariables
                          >({
                            mutation: sendInvitationMutation,
                            variables: {
                              id: (actions as IUpdateCommunityAction).payload
                                .id,
                              invitation: {
                                email: (actions as IInvitationsPayload).payload
                                  .invitations[invitationIndex].email,
                                role: (actions as IInvitationsPayload).payload
                                  .invitations[invitationIndex].role,
                                secret: result.attributes.secret,
                              },
                              signature: signedSignature,
                            },
                          })
                        )
                        .mergeMap(
                          ({
                            data: { sendInvitation: sendInvitationResult },
                          }: any) =>
                            apolloSubscriber<ISendInvitationCommandOutput>(
                              sendInvitationResult.hash
                            )
                        )
                  )
                )
                .combineAll()
                .do(signedSignatures =>
                  console.log("signedSignatures combined", signedSignatures)
                )
                .mergeMap(() =>
                  Observable.merge(
                    Observable.of(
                      showNotificationAction({
                        description: `The community's details have been updated!`,
                        message: "Community updated",
                        notificationType: "success",
                      })
                    ),
                    Observable.of(communityUpdatedAction()),
                    Observable.of(
                      routeChangeAction(
                        `/community/${
                          (actions as IUpdateCommunityAction).payload.id
                        }/community-updated`
                      )
                    )
                  )
                )
                .do(() => apolloClient.resetStore())
                .do(
                  () =>
                    typeof actions.callback === "function" && actions.callback()
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
                })
            : Observable.merge(
                Observable.of(
                  showNotificationAction({
                    description: `The community's details have been updated!`,
                    message: "Community updated",
                    notificationType: "success",
                  })
                ),
                Observable.of(communityUpdatedAction()),
                Observable.of(
                  routeChangeAction(
                    `/community/${
                      (actions as IUpdateCommunityAction).payload.id
                    }/community-updated`
                  )
                )
              ).do(() => apolloClient.resetStore())
        )
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
