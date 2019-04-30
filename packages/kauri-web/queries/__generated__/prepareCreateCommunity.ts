/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prepareCreateCommunity
// ====================================================

export interface prepareCreateCommunity_prepareCreateCommunity {
  __typename: "PrepareCommandResponseDTO";
  messageHash: string | null;
}

export interface prepareCreateCommunity {
  prepareCreateCommunity: prepareCreateCommunity_prepareCreateCommunity | null;
}

export interface prepareCreateCommunityVariables {
  name?: string | null;
  description?: string | null;
  avatar?: string | null;
  website?: string | null;
  tags?: (string | null)[] | null;
  social?: any | null;
  attributes?: any | null;
}
