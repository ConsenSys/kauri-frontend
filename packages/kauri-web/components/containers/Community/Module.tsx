import { Epic } from "redux-observable";
import { Observable } from "rxjs/Observable";
import R from "ramda";
import {
  IReduxState,
  IDependencies,
  showNotificationAction,
  Actions,
  routeChangeAction,
} from "../../../lib/Module";
import {
  curateCommunityResourcesMutation,
  approveResourceMutation,
  removeResourceMutation,
  prepareSendInvitationQuery,
  sendInvitationMutation,
  prepareAcceptInvitationQuery,
  acceptInvitationMutation,
  prepareRevokeInvitationQuery,
  revokeInvitationMutation,
  prepareRemoveMemberQuery,
  removeMemberMutation,
} from "../../../queries/Community";
import {
  curateCommunityResources,
  curateCommunityResourcesVariables,
} from "../../../queries/__generated__/curateCommunityResources";
import {
  approveResource,
  approveResourceVariables,
} from "../../../queries/__generated__/approveResource";

import {
  removeResource,
  removeResourceVariables,
} from "../../../queries/__generated__/removeResource";

import {
  sendInvitation,
  sendInvitationVariables,
} from "../../../queries/__generated__/sendInvitation";
import {
  prepareSendInvitation,
  prepareSendInvitationVariables,
} from "../../../queries/__generated__/prepareSendInvitation";
import {
  prepareAcceptInvitation,
  prepareAcceptInvitationVariables,
} from "../../../queries/__generated__/prepareAcceptInvitation";
import {
  acceptInvitation,
  acceptInvitationVariables,
} from "../../../queries/__generated__/acceptInvitation";
import {
  prepareRevokeInvitation,
  prepareRevokeInvitationVariables,
} from "../../../queries/__generated__/prepareRevokeInvitation";
import {
  revokeInvitation,
  revokeInvitationVariables,
} from "../../../queries/__generated__/revokeInvitation";
import {
  prepareRemoveMember,
  prepareRemoveMemberVariables,
} from "../../../queries/__generated__/prepareRemoveMember";
import {
  removeMember,
  removeMemberVariables,
} from "../../../queries/__generated__/removeMember";

import { ISendInvitationCommandOutput } from "../CreateCommunityForm/Module";
import { closeModalAction } from "../../../../kauri-components/components/Modal/Module";

interface ICurateCommunityResourcesAction {
  type: "CURATE_COMMUNITY_RESOURCES";
  payload: curateCommunityResourcesVariables;
}

interface IRemoveMemberAction {
  type: "REMOVE_MEMBER";
  payload: prepareRemoveMemberVariables;
}

interface IApproveResourceAction {
  type: "APPROVE_RESOURCE";
  payload: approveResourceVariables;
}

interface IRemoveResourceAction {
  type: "REMOVE_RESOURCE";
  payload: removeResourceVariables;
}

interface ISendCommunityInvitationAction {
  type: "SEND_COMMUNITY_INVITATION";
  payload: sendInvitationVariables;
}

interface IRevokeInvitationAction {
  type: "REVOKE_INVITATION";
  payload: revokeInvitationVariables;
}

interface IInvitationSentAction {
  type: "INVITATION_SENT";
}

interface IInvitationAcceptedAction {
  type: "INVITATION_ACCEPTED";
}

interface IInvitationRevokedAction {
  type: "INVITATION_REVOKED";
}

interface IMemberRemovedAction {
  type: "MEMBER_REMOVED";
}

interface IAcceptCommunityInvitationAction {
  type: "ACCEPT_COMMUNITY_INVITATION";
  payload: prepareAcceptInvitationVariables;
}

const CURATE_COMMUNITY_RESOURCES = "CURATE_COMMUNITY_RESOURCES";
const APPROVE_RESOURCE = "APPROVE_RESOURCE";
const REMOVE_RESOURCE = "REMOVE_RESOURCE";
const SEND_COMMUNITY_INVITATION = "SEND_COMMUNITY_INVITATION";
const INVITATION_SENT = "INVITATION_SENT";
const ACCEPT_COMMUNITY_INVITATION = "ACCEPT_COMMUNITY_INVITATION";
const INVITATION_ACCEPTED = "INVITATION_ACCEPTED";
const REVOKE_INVITATION = "REVOKE_INVITATION";
const INVITATION_REVOKED = "INVITATION_REVOKED";
const REMOVE_MEMBER = "REMOVE_MEMBER";
const MEMBER_REMOVED = "MEMBER_REMOVED";

export const invitationRevokedAction = (): IInvitationRevokedAction => ({
  type: INVITATION_REVOKED,
});

export const removeResourceAction = (
  payload: removeResourceVariables
): IRemoveResourceAction => ({
  payload,
  type: REMOVE_RESOURCE,
});

export const memberRemovedAction = (): IMemberRemovedAction => ({
  type: MEMBER_REMOVED,
});

export const removeMemberAction = (
  payload: removeMemberVariables
): IRemoveMemberAction => ({
  payload,
  type: REMOVE_MEMBER,
});

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

export const sendCommunityInvitationAction = (
  payload: sendInvitationVariables
): ISendCommunityInvitationAction => ({
  payload,
  type: SEND_COMMUNITY_INVITATION,
});

export const invitationSentAction = (): IInvitationSentAction => ({
  type: INVITATION_SENT,
});

export const invitationAcceptedAction = (): IInvitationAcceptedAction => ({
  type: INVITATION_ACCEPTED,
});

export const acceptCommunityInvitationAction = (
  payload: prepareAcceptInvitationVariables
): IAcceptCommunityInvitationAction => ({
  payload,
  type: ACCEPT_COMMUNITY_INVITATION,
});

export const revokeInvitationAction = (
  payload: prepareRevokeInvitationVariables
): IRevokeInvitationAction => ({
  payload,
  type: REVOKE_INVITATION,
});

interface ICurateCommunityResourcesCommandOutput {
  id: string;
  error?: string;
}

interface IAcceptInvitationCommandOutput {
  hash: string;
}

interface IRevokeInvitationCommandOutput {
  hash: string;
}

interface ICurateCommunityResourcesCommandOutput {
  messageHash: string;
  secret: string;
}

interface IRemoveResourceCommandOutput {
  hash: string;
}

interface IRemoveMemberCommandOutput {
  hash: string;
}

type IApproveResourceCommandOutput = ICurateCommunityResourcesCommandOutput;

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
          apolloSubscriber<ICurateCommunityResourcesCommandOutput>(hash)
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

export const sendCommunityInvitationEpic: Epic<
  Actions,
  IReduxState,
  IDependencies
> = (action$, _, { apolloClient, apolloSubscriber, personalSign }) =>
  action$
    .ofType(SEND_COMMUNITY_INVITATION)
    .switchMap(({ payload }: ISendCommunityInvitationAction) =>
      Observable.fromPromise(
        apolloClient.query<
          prepareSendInvitation,
          prepareSendInvitationVariables
        >({
          query: prepareSendInvitationQuery,
          variables: payload,
        })
      ).mergeMap(({ data: { prepareSendInvitation: result } }) =>
        Observable.fromPromise(personalSign(result && result.messageHash))
          .mergeMap(signedSignature =>
            apolloClient.mutate<sendInvitation, sendInvitationVariables>({
              mutation: sendInvitationMutation,
              variables: {
                id: payload.id,
                invitation: {
                  email: payload.invitation && payload.invitation.email,
                  role: payload.invitation && payload.invitation.role,
                  secret: result && result.attributes.secret,
                },
                signature:
                  typeof signedSignature === "string" ? signedSignature : "",
              },
            })
          )
          .mergeMap(({ data: { sendInvitation: sendInvitationResult } }: any) =>
            apolloSubscriber<ISendInvitationCommandOutput>(
              sendInvitationResult.hash
            )
          )
          .do(() => apolloClient.resetStore())
          .mergeMap(() =>
            Observable.merge(
              Observable.of(
                showNotificationAction({
                  description: `The invitation ${payload.invitation &&
                    payload.invitation
                      .email} for to join the community has been sent!`,
                  message: "Invitation Sent",
                  notificationType: "success",
                })
              ),
              Observable.of(invitationSentAction()),
              Observable.of(closeModalAction())
            )
          )
      )
    );

export const acceptCommunityInvitationEpic: Epic<
  Actions,
  IReduxState,
  IDependencies
> = (action$, _, { apolloClient, apolloSubscriber, personalSign }) =>
  action$
    .ofType(ACCEPT_COMMUNITY_INVITATION)
    .switchMap(({ payload }: IAcceptCommunityInvitationAction) =>
      Observable.fromPromise(
        apolloClient.query<
          prepareAcceptInvitation,
          prepareAcceptInvitationVariables
        >({
          query: prepareAcceptInvitationQuery,
          variables: payload,
        })
      ).mergeMap(({ data: { prepareAcceptInvitation: result } }) =>
        Observable.fromPromise<string>(
          personalSign(result && result.messageHash)
        )
          .mergeMap(signature =>
            apolloClient.mutate<acceptInvitation, acceptInvitationVariables>({
              mutation: acceptInvitationMutation,
              variables: {
                id: (payload && payload.id) || "",
                secret: (payload && payload.secret) || "",
                signature,
              },
            })
          )
          .mergeMap(
            ({ data: { acceptInvitation: acceptInvitationResult } }: any) =>
              apolloSubscriber<IAcceptInvitationCommandOutput>(
                acceptInvitationResult.hash
              )
          )
          .do(() => apolloClient.resetStore())
          .mergeMap(() =>
            Observable.merge(
              Observable.of(closeModalAction()),
              Observable.of(
                showNotificationAction({
                  description: `You are now a member of the community!`,
                  message: "Invitation Accepted",
                  notificationType: "success",
                })
              ),
              Observable.of(routeChangeAction(`/community/${payload.id}`)),
              Observable.of(invitationAcceptedAction())
            )
          )
      )
    );

export const revokeInvitationEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber, personalSign }
) =>
  action$
    .ofType(REVOKE_INVITATION)
    .switchMap(({ payload }: IRevokeInvitationAction) =>
      Observable.fromPromise(
        apolloClient.query<
          prepareRevokeInvitation,
          prepareRevokeInvitationVariables
        >({
          query: prepareRevokeInvitationQuery,
          variables: payload,
        })
      ).mergeMap(({ data: { prepareRevokeInvitation: result } }) =>
        Observable.fromPromise<string>(
          personalSign(result && result.messageHash)
        )
          .mergeMap(signature =>
            apolloClient.mutate<revokeInvitation, revokeInvitationVariables>({
              mutation: revokeInvitationMutation,
              variables: {
                id: (payload && payload.id) || "",
                invitationId: (payload && payload.invitationId) || "",
                signature,
              },
            })
          )
          .mergeMap(
            ({ data: { revokeInvitation: revokeInvitationResult } }: any) =>
              apolloSubscriber<IRevokeInvitationCommandOutput>(
                revokeInvitationResult.hash
              )
          )
          .do(() => apolloClient.resetStore())
          .mergeMap(() =>
            Observable.merge(
              Observable.of(closeModalAction()),
              Observable.of(
                showNotificationAction({
                  description: `That invitation to the community has been successfully revoked`,
                  message: "Invitation Revoked",
                  notificationType: "success",
                })
              ),
              Observable.of(invitationRevokedAction())
            )
          )
      )
    );

export const removeMemberEpic: Epic<Actions, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber, personalSign }
) =>
  action$.ofType(REMOVE_MEMBER).switchMap(({ payload }: IRemoveMemberAction) =>
    Observable.fromPromise(
      apolloClient.query<prepareRemoveMember, prepareRemoveMemberVariables>({
        query: prepareRemoveMemberQuery,
        variables: payload,
      })
    ).mergeMap(({ data: { prepareRemoveMember: result } }) =>
      Observable.fromPromise<string>(personalSign(result && result.messageHash))
        .mergeMap(signature =>
          apolloClient.mutate<removeMember, removeMemberVariables>({
            mutation: removeMemberMutation,
            variables: {
              account: (payload && payload.account) || "",
              id: (payload && payload.id) || "",
              signature,
            },
          })
        )
        .mergeMap(({ data: { removeMember: removeMemberResult } }: any) =>
          apolloSubscriber<IRemoveMemberCommandOutput>(removeMemberResult.hash)
        )
        .do(() => apolloClient.resetStore())
        .mergeMap(() =>
          Observable.merge(
            Observable.of(closeModalAction()),
            Observable.of(
              showNotificationAction({
                description: `That user has been successfully removed from the community`,
                message: "Member removed",
                notificationType: "success",
              })
            ),
            Observable.of(memberRemovedAction())
          )
        )
    )
  );

export const removeResourceEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(REMOVE_RESOURCE)
    .switchMap(({ payload }: IRemoveResourceAction) =>
      Observable.fromPromise(
        apolloClient.mutate<removeResource, removeResourceVariables>({
          mutation: removeResourceMutation,
          variables: payload,
        })
      )
        .mergeMap(({ data: { removeResource: { hash } } }) =>
          apolloSubscriber<IRemoveResourceCommandOutput>(hash)
        )
        .mergeMap(({ data: { output: { error } } }) =>
          error
            ? Observable.merge(
                Observable.of(closeModalAction()),
                Observable.of(
                  showNotificationAction({
                    description: `There was an error removing the selected item, please try again.`,
                    message: "Error",
                    notificationType: "error",
                  })
                )
              )
            : Observable.merge(
                Observable.of(closeModalAction()),
                Observable.of(
                  showNotificationAction({
                    description: `Your selected resource was successfully removed from this community!`,
                    message: "Resource Removed",
                    notificationType: "success",
                  })
                )
              )
        )
        .do(() => apolloClient.resetStore())
    );
