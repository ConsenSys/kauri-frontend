/* tslint:disable */
// This file was automatically generated and should not be edited.

import {
  SearchFilterInput,
  ResourceType,
  ArticleStatus,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchResultsAutocomplete
// ====================================================

export interface searchResultsAutocomplete_searchAutocomplete_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_PublicUserDTO {
  __typename:
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner =
  | searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_ArticleDTO
  | searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO
  | searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO;

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content | null)[]
    | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  vote: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_vote | null;
  author: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_author | null;
  owner: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner | null;
  comments: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments | null;
  resourceIdentifier: searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId:
    | (searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_sections_resourcesId | null)[]
    | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner | null;
  sections:
    | (searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_sections | null)[]
    | null;
  resourceIdentifier: searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface searchResultsAutocomplete_searchAutocomplete_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
}

export type searchResultsAutocomplete_searchAutocomplete_content_resource =
  | searchResultsAutocomplete_searchAutocomplete_content_resource_PublicUserDTO
  | searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO
  | searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO
  | searchResultsAutocomplete_searchAutocomplete_content_resource_CommunityDTO;

export interface searchResultsAutocomplete_searchAutocomplete_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: searchResultsAutocomplete_searchAutocomplete_content_resourceIdentifier | null;
  resource: searchResultsAutocomplete_searchAutocomplete_content_resource | null;
}

export interface searchResultsAutocomplete_searchAutocomplete {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any | null;
  totalPages: number | null;
  totalElementsBreakdown: any | null;
  content:
    | (searchResultsAutocomplete_searchAutocomplete_content | null)[]
    | null;
}

export interface searchResultsAutocomplete {
  searchAutocomplete: searchResultsAutocomplete_searchAutocomplete | null;
}

export interface searchResultsAutocompleteVariables {
  page?: number | null;
  size?: number | null;
  query?: string | null;
  filter?: SearchFilterInput | null;
}
