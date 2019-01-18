/* tslint:disable */
// This file was automatically generated and should not be edited.

import {
  SearchFilterInput,
  ResourceType,
  ArticleStatus,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchAutocomplete
// ====================================================

export interface searchAutocomplete_searchAutocomplete_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_CommunityDTO {
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

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_ArticleDTO {
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

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner =
  | searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_ArticleDTO
  | searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO
  | searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO;

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments_content | null)[]
    | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO {
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
  vote: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_vote | null;
  author: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_author | null;
  owner: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_owner | null;
  comments: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_comments | null;
  resourceIdentifier: searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO_resourceIdentifier | null;
}

export type searchAutocomplete_searchAutocomplete_content_resource =
  | searchAutocomplete_searchAutocomplete_content_resource_CommunityDTO
  | searchAutocomplete_searchAutocomplete_content_resource_ArticleDTO;

export interface searchAutocomplete_searchAutocomplete_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: searchAutocomplete_searchAutocomplete_content_resourceIdentifier | null;
  tags: (string | null)[] | null;
  name: string | null;
  description: string | null;
  score: number | null;
  resource: searchAutocomplete_searchAutocomplete_content_resource | null;
}

export interface searchAutocomplete_searchAutocomplete {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any | null;
  totalPages: number | null;
  totalElementsBreakdown: any | null;
  content: (searchAutocomplete_searchAutocomplete_content | null)[] | null;
}

export interface searchAutocomplete {
  searchAutocomplete: searchAutocomplete_searchAutocomplete | null;
}

export interface searchAutocompleteVariables {
  page?: number | null;
  size?: number | null;
  query?: string | null;
  filter?: SearchFilterInput | null;
}
