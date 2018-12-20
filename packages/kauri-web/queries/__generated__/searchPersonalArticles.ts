/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchPersonalArticles
// ====================================================

export interface searchPersonalArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface searchPersonalArticles_searchArticles_content_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface searchPersonalArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
}

export interface searchPersonalArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
}

export type searchPersonalArticles_searchArticles_content_owner = searchPersonalArticles_searchArticles_content_owner_ArticleDTO | searchPersonalArticles_searchArticles_content_owner_PublicUserDTO | searchPersonalArticles_searchArticles_content_owner_CommunityDTO;

export interface searchPersonalArticles_searchArticles_content_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface searchPersonalArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface searchPersonalArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  posted: any | null;
  author: searchPersonalArticles_searchArticles_content_comments_content_author | null;
  body: string | null;
}

export interface searchPersonalArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (searchPersonalArticles_searchArticles_content_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchPersonalArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface searchPersonalArticles_searchArticles_content {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  tags: (string | null)[] | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: searchPersonalArticles_searchArticles_content_author | null;
  owner: searchPersonalArticles_searchArticles_content_owner | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  vote: searchPersonalArticles_searchArticles_content_vote | null;
  comments: searchPersonalArticles_searchArticles_content_comments | null;
  resourceIdentifier: searchPersonalArticles_searchArticles_content_resourceIdentifier | null;
}

export interface searchPersonalArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  totalElements: any | null;
  isLast: boolean | null;
  content: (searchPersonalArticles_searchArticles_content | null)[] | null;
  totalPages: number | null;
}

export interface searchPersonalArticles {
  searchArticles: searchPersonalArticles_searchArticles | null;
}

export interface searchPersonalArticlesVariables {
  userId?: string | null;
  size?: number | null;
  page?: number | null;
}
