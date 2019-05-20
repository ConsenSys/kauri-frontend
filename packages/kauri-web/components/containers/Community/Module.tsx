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
  prepareSendInvitationQuery,
  sendInvitationMutation,
  prepareAcceptInvitationQuery,
  acceptInvitationMutation,
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

import { ISendInvitationCommandOutput } from "../CreateCommunityForm/Module";
import { closeModalAction } from "../../../../kauri-components/components/Modal/Module";

interface ICurateCommunityResourcesAction {
  type: "CURATE_COMMUNITY_RESOURCES";
  payload: curateCommunityResourcesVariables;
}

interface IApproveResourceAction {
  type: "APPROVE_RESOURCE";
  payload: approveResourceVariables;
}

interface ISendCommunityInvitationAction {
  type: "SEND_COMMUNITY_INVITATION";
  payload: sendInvitationVariables;
}

interface IInvitationSentAction {
  type: "INVITATION_SENT";
}

interface IInvitationAcceptedAction {
  type: "INVITATION_ACCEPTED";
}

interface IAcceptCommunityInvitationAction {
  type: "ACCEPT_COMMUNITY_INVITATION";
  payload: prepareAcceptInvitationVariables;
}

const CURATE_COMMUNITY_RESOURCES = "CURATE_COMMUNITY_RESOURCES";
const APPROVE_RESOURCE = "APPROVE_RESOURCE";
const SEND_COMMUNITY_INVITATION = "SEND_COMMUNITY_INVITATION";
const INVITATION_SENT = "INVITATION_SENT";
const ACCEPT_COMMUNITY_INVITATION = "ACCEPT_COMMUNITY_INVITATION";
const INVITATION_ACCEPTED = "INVITATION_ACCEPTED";

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

interface ICurateCommunityResourcesCommandOutput {
  id: string;
  error?: string;
}

interface IAcceptInvitationCommandOutput {
  hash: string;
}

type IApproveResourceCommandOutput = ICurateCommunityResourcesCommandOutput;

interface ICurateCommunityResourcesCommandOutput {
  messageHash: string;
  secret: string;
}

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
