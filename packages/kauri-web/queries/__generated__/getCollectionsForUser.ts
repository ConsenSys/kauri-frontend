/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CollectionFilterInput, DirectionInput, ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCollectionsForUser
// ====================================================

export interface getCollectionsForUser_searchCollections_content_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollectionsForUser_searchCollections_content_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCollectionsForUser_searchCollections_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCollectionsForUser_searchCollections_content_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCollectionsForUser_searchCollections_content_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCollectionsForUser_searchCollections_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCollectionsForUser_searchCollections_content_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCollectionsForUser_searchCollections_content_owner = getCollectionsForUser_searchCollections_content_owner_ArticleDTO | getCollectionsForUser_searchCollections_content_owner_PublicUserDTO | getCollectionsForUser_searchCollections_content_owner_CommunityDTO;

export interface getCollectionsForUser_searchCollections_content_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCollectionsForUser_searchCollections_content_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollectionsForUser_searchCollections_content_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getCollectionsForUser_searchCollections_content_sections_resources = getCollectionsForUser_searchCollections_content_sections_resources_CommunityDTO | getCollectionsForUser_searchCollections_content_sections_resources_ArticleDTO;

export interface getCollectionsForUser_searchCollections_content_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (getCollectionsForUser_searchCollections_content_sections_resourcesId | null)[] | null;
  resources: (getCollectionsForUser_searchCollections_content_sections_resources | null)[] | null;
}

export interface getCollectionsForUser_searchCollections_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCollectionsForUser_searchCollections_content {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCollectionsForUser_searchCollections_content_owner | null;
  sections: (getCollectionsForUser_searchCollections_content_sections | null)[] | null;
  resourceIdentifier: getCollectionsForUser_searchCollections_content_resourceIdentifier | null;
}

export interface getCollectionsForUser_searchCollections {
  __typename: "ResponsePage_CollectionDTO";
  totalElements: any;
  content: (getCollectionsForUser_searchCollections_content | null)[] | null;
  isLast: boolean;
}

export interface getCollectionsForUser {
  searchCollections: getCollectionsForUser_searchCollections | null;
}

export interface getCollectionsForUserVariables {
  filter?: CollectionFilterInput | null;
  size?: number | null;
  page?: number | null;
  sort?: string | null;
  dir?: DirectionInput | null;
}
