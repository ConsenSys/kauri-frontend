/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: removeResource
// ====================================================

export interface removeResource_removeResource {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface removeResource {
  removeResource: removeResource_removeResource | null;
}

export interface removeResourceVariables {
  id?: string | null;
  resource?: ResourceIdentifierInput | null;
}
