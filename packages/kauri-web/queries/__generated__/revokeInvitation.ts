/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: revokeInvitation
// ====================================================

export interface revokeInvitation_revokeInvitation {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface revokeInvitation {
  revokeInvitation: revokeInvitation_revokeInvitation | null;
}

export interface revokeInvitationVariables {
  signature?: string | null;
  id?: string | null;
  invitationId?: string | null;
}
