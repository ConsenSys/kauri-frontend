/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addArticleToCollection
// ====================================================

export interface addArticleToCollection_addCollectionResource {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface addArticleToCollection {
  addCollectionResource: addArticleToCollection_addCollectionResource | null;
}

export interface addArticleToCollectionVariables {
  id?: string | null;
  sectionId?: string | null;
  resourceId?: ResourceIdentifierInput | null;
  position?: number | null;
}
