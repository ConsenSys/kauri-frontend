/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCollection
// ====================================================

export interface createCollection_createCollection {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface createCollection {
  createCollection: createCollection_createCollection | null;
}

export interface createCollectionVariables {
  name?: string | null;
  description?: string | null;
  background?: string | null;
}