/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCommunity
// ====================================================

export interface updateCommunity_createCommunity {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface updateCommunity {
  createCommunity: updateCommunity_createCommunity | null;
}

export interface updateCommunityVariables {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  avatar?: string | null;
  website?: string | null;
  tags?: (string | null)[] | null;
  social?: any | null;
  attributes?: any | null;
}
