/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CommunityOwner
// ====================================================

export interface CommunityOwner_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface CommunityOwner {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: CommunityOwner_resourceIdentifier | null;
}
