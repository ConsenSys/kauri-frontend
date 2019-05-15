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
  IPrepareSendInvitationQueryResult,
  ISendInvitationCommandOutput,
} from "../CreateCommunityForm/Module";

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

const CURATE_COMMUNITY_RESOURCES = "CURATE_COMMUNITY_RESOURCES";
const APPROVE_RESOURCE = "APPROVE_RESOURCE";
const SEND_COMMUNITY_INVITATION = "SEND_COMMUNITY_INVITATION";
const INVITATION_SENT = "INVITATION_SENT";

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
              Observable.of(
                routeChangeAction(`/community/${payload.id}/community-updated`)
              )
            )
          )
      )
    );
