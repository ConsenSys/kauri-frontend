/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCollectionTitle
// ====================================================

export interface getCollectionTitle_getCollection {
  __typename: "CollectionDTO";
  name: string | null;
}

export interface getCollectionTitle {
  getCollection: getCollectionTitle_getCollection | null;
}

export interface getCollectionTitleVariables {
  id?: string | null;
}
