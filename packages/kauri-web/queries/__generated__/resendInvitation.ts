/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resendInvitation
// ====================================================

export interface resendInvitation_resendInvitation {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface resendInvitation {
  resendInvitation: resendInvitation_resendInvitation | null;
}

export interface resendInvitationVariables {
  id?: string | null;
  invitationId?: string | null;
  email?: string | null;
}
