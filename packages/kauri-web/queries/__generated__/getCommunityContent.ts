/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  CommunityResourceFilterInput,
  ResourceTypeInput,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunityContent
// ====================================================

export interface getCommunityContent_getCommunityContent_content_resource_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  title: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
}

export type getCommunityContent_getCommunityContent_content_resource =
  | getCommunityContent_getCommunityContent_content_resource_CommunityDTO
  | getCommunityContent_getCommunityContent_content_resource_ArticleDTO
  | getCommunityContent_getCommunityContent_content_resource_CollectionDTO;

export interface getCommunityContent_getCommunityContent_content {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  resource: getCommunityContent_getCommunityContent_content_resource | null;
}

export interface getCommunityContent_getCommunityContent {
  __typename: "ResponsePage_ResourceIdentifier";
  content: (getCommunityContent_getCommunityContent_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunityContent {
  getCommunityContent: getCommunityContent_getCommunityContent | null;
}

export interface getCommunityContentVariables {
  id?: string | null;
  page?: number | null;
  size?: number | null;
  filter?: CommunityResourceFilterInput | null;
}
