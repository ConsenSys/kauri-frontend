/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: curateCommunityResource
// ====================================================

export interface curateCommunityResource_curateResource {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface curateCommunityResource {
  curateResource: curateCommunityResource_curateResource | null;
}

export interface curateCommunityResourceVariables {
  id?: string | null;
  resource?: ResourceIdentifierInput | null;
}
