/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeMember
// ====================================================

export interface removeMember_removeMember {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface removeMember {
  removeMember: removeMember_removeMember | null;
}

export interface removeMemberVariables {
  signature?: string | null;
  id?: string | null;
  account?: string | null;
}
