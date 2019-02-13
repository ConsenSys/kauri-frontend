/* tslint:disable */
// This file was automatically generated and should not be edited.

import {
  SearchFilterInput,
  ResourceType,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchAutocompleteCollections
// ====================================================

export interface searchAutocompleteCollections_searchAutocomplete_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resources_CommunityDTO {
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

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resources =
  | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resources_CommunityDTO
  | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId:
    | (searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resourcesId | null)[]
    | null;
  resources:
    | (searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections_resources | null)[]
    | null;
}

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner | null;
  sections:
    | (searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_sections | null)[]
    | null;
  resourceIdentifier: searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_resourceIdentifier | null;
}

export type searchAutocompleteCollections_searchAutocomplete_content_resource =
  | searchAutocompleteCollections_searchAutocomplete_content_resource_CommunityDTO
  | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO;

export interface searchAutocompleteCollections_searchAutocomplete_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: searchAutocompleteCollections_searchAutocomplete_content_resourceIdentifier | null;
  resource: searchAutocompleteCollections_searchAutocomplete_content_resource | null;
}

export interface searchAutocompleteCollections_searchAutocomplete {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any | null;
  totalPages: number | null;
  content:
    | (searchAutocompleteCollections_searchAutocomplete_content | null)[]
    | null;
}

export interface searchAutocompleteCollections {
  searchAutocomplete: searchAutocompleteCollections_searchAutocomplete | null;
}

export interface searchAutocompleteCollectionsVariables {
  page?: number | null;
  size?: number | null;
  query?: string | null;
  filter?: SearchFilterInput | null;
}
