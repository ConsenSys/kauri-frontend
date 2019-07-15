/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prepareRevokeInvitation
// ====================================================

export interface prepareRevokeInvitation_prepareRevokeInvitation {
  __typename: "PrepareCommandResponseDTO";
  messageHash: string | null;
}

export interface prepareRevokeInvitation {
  prepareRevokeInvitation: prepareRevokeInvitation_prepareRevokeInvitation | null;
}

export interface prepareRevokeInvitationVariables {
  id?: string | null;
  invitationId?: string | null;
}
