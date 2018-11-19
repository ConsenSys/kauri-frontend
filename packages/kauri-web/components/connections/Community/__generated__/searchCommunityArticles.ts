/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchCommunityArticles
// ====================================================

export interface searchCommunityArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  username: string | null;
}

export interface searchCommunityArticles_searchArticles_content_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface searchCommunityArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  username: string | null;
}

export interface searchCommunityArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  posted: any | null;
  author: searchCommunityArticles_searchArticles_content_comments_content_author | null;
  body: string | null;
}

export interface searchCommunityArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (searchCommunityArticles_searchArticles_content_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchCommunityArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface searchCommunityArticles_searchArticles_content {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: searchCommunityArticles_searchArticles_content_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  vote: searchCommunityArticles_searchArticles_content_vote | null;
  comments: searchCommunityArticles_searchArticles_content_comments | null;
  resourceIdentifier: searchCommunityArticles_searchArticles_content_resourceIdentifier | null;
}

export interface searchCommunityArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  content: (searchCommunityArticles_searchArticles_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchCommunityArticles {
  searchArticles: searchCommunityArticles_searchArticles | null;
}

export interface searchCommunityArticlesVariables {
  category?: string | null;
}
