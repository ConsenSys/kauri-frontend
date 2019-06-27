/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptInvitation
// ====================================================

export interface acceptInvitation_acceptInvitation {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface acceptInvitation {
  acceptInvitation: acceptInvitation_acceptInvitation | null;
}

export interface acceptInvitationVariables {
  signature?: string | null;
  id?: string | null;
  secret?: string | null;
}
