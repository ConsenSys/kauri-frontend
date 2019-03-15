/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: curateResource
// ====================================================

export interface curateResource_curateResource {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface curateResource {
  curateResource: curateResource_curateResource | null;
}

export interface curateResourceVariables {
  id?: string | null;
  resource?: ResourceIdentifierInput | null;
}
