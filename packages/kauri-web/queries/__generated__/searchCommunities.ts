/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CommunityFilterInput, DirectionInput, CommunityStatusInput, ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchCommunities
// ====================================================

export interface searchCommunities_searchCommunities_content_approvedId {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
}

export interface searchCommunities_searchCommunities_content {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  status: CommunityStatusInput | null;
  website: string | null;
  avatar: string | null;
  tags: (string | null)[] | null;
  social: any | null;
  approvedId: (searchCommunities_searchCommunities_content_approvedId | null)[] | null;
}

export interface searchCommunities_searchCommunities {
  __typename: "ResponsePage_CommunityDTO";
  content: (searchCommunities_searchCommunities_content | null)[] | null;
  isLast: boolean;
}

export interface searchCommunities {
  searchCommunities: searchCommunities_searchCommunities | null;
}

export interface searchCommunitiesVariables {
  size?: number | null;
  page?: number | null;
  filter?: CommunityFilterInput | null;
  sort?: string | null;
  dir?: DirectionInput | null;
}
