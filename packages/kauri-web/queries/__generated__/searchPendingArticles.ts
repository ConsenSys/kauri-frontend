/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleFilterInput, ResourceTypeInput, ArticleStatusInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchPendingArticles
// ====================================================

export interface searchPendingArticles_searchArticles_content_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface searchPendingArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface searchPendingArticles_searchArticles_content_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface searchPendingArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchPendingArticles_searchArticles_content_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface searchPendingArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface searchPendingArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: searchPendingArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface searchPendingArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface searchPendingArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchPendingArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier | null;
}

export type searchPendingArticles_searchArticles_content_owner = searchPendingArticles_searchArticles_content_owner_ArticleDTO | searchPendingArticles_searchArticles_content_owner_PublicUserDTO | searchPendingArticles_searchArticles_content_owner_CommunityDTO;

export interface searchPendingArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchPendingArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  author: searchPendingArticles_searchArticles_content_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface searchPendingArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (searchPendingArticles_searchArticles_content_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface searchPendingArticles_searchArticles_content {
  __typename: "ArticleDTO";
  associatedNfts: (searchPendingArticles_searchArticles_content_associatedNfts | null)[] | null;
  resourceIdentifier: searchPendingArticles_searchArticles_content_resourceIdentifier | null;
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
  voteResult: searchPendingArticles_searchArticles_content_voteResult | null;
  author: searchPendingArticles_searchArticles_content_author | null;
  owner: searchPendingArticles_searchArticles_content_owner | null;
  comments: searchPendingArticles_searchArticles_content_comments | null;
  updateComment: string | null;
}

export interface searchPendingArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  content: (searchPendingArticles_searchArticles_content | null)[] | null;
  totalElements: any;
}

export interface searchPendingArticles {
  searchArticles: searchPendingArticles_searchArticles | null;
}

export interface searchPendingArticlesVariables {
  size?: number | null;
  filter?: ArticleFilterInput | null;
}
