/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

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
  tags?: (string | null)[] | null;
  owner?: ResourceIdentifierInput | null;
}
