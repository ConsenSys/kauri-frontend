/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prepareAcceptInvitation
// ====================================================

export interface prepareAcceptInvitation_prepareAcceptInvitation {
  __typename: "PrepareCommandResponseDTO";
  messageHash: string | null;
}

export interface prepareAcceptInvitation {
  prepareAcceptInvitation: prepareAcceptInvitation_prepareAcceptInvitation | null;
}

export interface prepareAcceptInvitationVariables {
  id?: string | null;
  secret?: string | null;
}
