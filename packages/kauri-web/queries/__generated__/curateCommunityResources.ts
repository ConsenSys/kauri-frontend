/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: curateCommunityResources
// ====================================================

export interface curateCommunityResources_curateResources {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface curateCommunityResources {
  curateResources: curateCommunityResources_curateResources | null;
}

export interface curateCommunityResourcesVariables {
  id?: string | null;
  resources?: (ResourceIdentifierInput | null)[] | null;
}
