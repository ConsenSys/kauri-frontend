/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editCollection
// ====================================================

export interface editCollection_createCollection {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface editCollection {
  createCollection: editCollection_createCollection | null;
}

export interface editCollectionVariables {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  background?: string | null;
  tags?: (string | null)[] | null;
}
