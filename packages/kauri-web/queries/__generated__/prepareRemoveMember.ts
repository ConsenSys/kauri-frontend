/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prepareRemoveMember
// ====================================================

export interface prepareRemoveMember_prepareRemoveMember {
  __typename: "PrepareCommandResponseDTO";
  messageHash: string | null;
}

export interface prepareRemoveMember {
  prepareRemoveMember: prepareRemoveMember_prepareRemoveMember | null;
}

export interface prepareRemoveMemberVariables {
  id?: string | null;
  account?: string | null;
}
