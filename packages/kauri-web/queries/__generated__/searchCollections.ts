/* tslint:disable */
// This file was automatically generated and should not be edited.

import {
  CollectionFilterInput,
  ResourceType,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchCollections
// ====================================================

export interface searchCollections_searchCollections_content_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchCollections_searchCollections_content_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchCollections_searchCollections_content_sections_resources_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface searchCollections_searchCollections_content_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type searchCollections_searchCollections_content_sections_resources =
  | searchCollections_searchCollections_content_sections_resources_CommunityDTO
  | searchCollections_searchCollections_content_sections_resources_ArticleDTO;

export interface searchCollections_searchCollections_content_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId:
    | (searchCollections_searchCollections_content_sections_resourcesId | null)[]
    | null;
  resources:
    | (searchCollections_searchCollections_content_sections_resources | null)[]
    | null;
}

export interface searchCollections_searchCollections_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface searchCollections_searchCollections_content {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: searchCollections_searchCollections_content_owner | null;
  sections:
    | (searchCollections_searchCollections_content_sections | null)[]
    | null;
  resourceIdentifier: searchCollections_searchCollections_content_resourceIdentifier | null;
}

export interface searchCollections_searchCollections {
  __typename: "ResponsePage_CollectionDTO";
  content: (searchCollections_searchCollections_content | null)[] | null;
}

export interface searchCollections {
  searchCollections: searchCollections_searchCollections | null;
}

export interface searchCollectionsVariables {
  filter?: CollectionFilterInput | null;
}
