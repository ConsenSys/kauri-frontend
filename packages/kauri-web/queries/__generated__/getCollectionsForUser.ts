/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CollectionFilterInput, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCollectionsForUser
// ====================================================

export interface getCollectionsForUser_searchCollections_content_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCollectionsForUser_searchCollections_content_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
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
  type: ResourceType | null;
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
  totalElements: any | null;
  content: (getCollectionsForUser_searchCollections_content | null)[] | null;
  isLast: boolean | null;
}

export interface getCollectionsForUser {
  searchCollections: getCollectionsForUser_searchCollections | null;
}

export interface getCollectionsForUserVariables {
  filter?: CollectionFilterInput | null;
  size?: number | null;
  page?: number | null;
}
