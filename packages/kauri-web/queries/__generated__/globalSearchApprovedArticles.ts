/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: globalSearchApprovedArticles
// ====================================================

export interface globalSearchApprovedArticles_searchArticles_content_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: globalSearchApprovedArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier | null;
}

export type globalSearchApprovedArticles_searchArticles_content_owner = globalSearchApprovedArticles_searchArticles_content_owner_ArticleDTO | globalSearchApprovedArticles_searchArticles_content_owner_PublicUserDTO | globalSearchApprovedArticles_searchArticles_content_owner_CommunityDTO;

export interface globalSearchApprovedArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  author: globalSearchApprovedArticles_searchArticles_content_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (globalSearchApprovedArticles_searchArticles_content_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface globalSearchApprovedArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface globalSearchApprovedArticles_searchArticles_content {
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
  vote: globalSearchApprovedArticles_searchArticles_content_vote | null;
  author: globalSearchApprovedArticles_searchArticles_content_author | null;
  owner: globalSearchApprovedArticles_searchArticles_content_owner | null;
  comments: globalSearchApprovedArticles_searchArticles_content_comments | null;
  resourceIdentifier: globalSearchApprovedArticles_searchArticles_content_resourceIdentifier | null;
}

export interface globalSearchApprovedArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  content: (globalSearchApprovedArticles_searchArticles_content | null)[] | null;
  isLast: boolean | null;
}

export interface globalSearchApprovedArticles {
  searchArticles: globalSearchApprovedArticles_searchArticles | null;
}

export interface globalSearchApprovedArticlesVariables {
  size?: number | null;
  page?: number | null;
  text?: string | null;
}
