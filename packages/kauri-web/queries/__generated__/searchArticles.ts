/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchArticles
// ====================================================

export interface searchArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
}

export interface searchArticles_searchArticles_content_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface searchArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
}

export interface searchArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
}

export type searchArticles_searchArticles_content_owner = searchArticles_searchArticles_content_owner_ArticleDTO | searchArticles_searchArticles_content_owner_PublicUserDTO | searchArticles_searchArticles_content_owner_CommunityDTO;

export interface searchArticles_searchArticles_content_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface searchArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface searchArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  posted: any | null;
  author: searchArticles_searchArticles_content_comments_content_author | null;
  body: string | null;
}

export interface searchArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (searchArticles_searchArticles_content_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface searchArticles_searchArticles_content {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  tags: (string | null)[] | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: searchArticles_searchArticles_content_author | null;
  owner: searchArticles_searchArticles_content_owner | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  voteResult: searchArticles_searchArticles_content_voteResult | null;
  comments: searchArticles_searchArticles_content_comments | null;
  resourceIdentifier: searchArticles_searchArticles_content_resourceIdentifier | null;
}

export interface searchArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  totalElements: any | null;
  isLast: boolean | null;
  content: (searchArticles_searchArticles_content | null)[] | null;
}

export interface searchArticles {
  searchArticles: searchArticles_searchArticles | null;
}

export interface searchArticlesVariables {
  userId?: string | null;
  size?: number | null;
  page?: number | null;
}
