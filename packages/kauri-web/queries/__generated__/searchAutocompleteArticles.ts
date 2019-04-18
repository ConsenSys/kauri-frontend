/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  SearchFilterInput,
  ResourceTypeInput,
  ArticleStatusInput,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchAutocompleteArticles
// ====================================================

export interface searchAutocompleteArticles_searchAutocomplete_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_CommunityDTO {
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

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_ArticleDTO {
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

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner =
  | searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_ArticleDTO
  | searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO
  | searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO;

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_comments_content | null)[]
    | null;
  totalPages: number;
  totalElements: any;
}

export interface searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts:
    | (searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_associatedNfts | null)[]
    | null;
  resourceIdentifier: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_resourceIdentifier | null;
  description: string | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  voteResult: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_voteResult | null;
  author: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_author | null;
  owner: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner | null;
  comments: searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_comments | null;
  updateComment: string | null;
}

export type searchAutocompleteArticles_searchAutocomplete_content_resource =
  | searchAutocompleteArticles_searchAutocomplete_content_resource_CommunityDTO
  | searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO;

export interface searchAutocompleteArticles_searchAutocomplete_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: searchAutocompleteArticles_searchAutocomplete_content_resourceIdentifier | null;
  resource: searchAutocompleteArticles_searchAutocomplete_content_resource | null;
}

export interface searchAutocompleteArticles_searchAutocomplete {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any;
  totalPages: number;
  isLast: boolean;
  content:
    | (searchAutocompleteArticles_searchAutocomplete_content | null)[]
    | null;
}

export interface searchAutocompleteArticles {
  searchAutocomplete: searchAutocompleteArticles_searchAutocomplete | null;
}

export interface searchAutocompleteArticlesVariables {
  page?: number | null;
  size?: number | null;
  query?: string | null;
  filter?: SearchFilterInput | null;
}
