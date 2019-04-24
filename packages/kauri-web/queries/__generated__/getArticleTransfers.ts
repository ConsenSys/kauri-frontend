/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DirectionInput, ResourceTypeInput, ArticleStatusInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getArticleTransfers
// ====================================================

export interface getArticleTransfers_getArticleTransfers_content_article_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getArticleTransfers_getArticleTransfers_content_article_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getArticleTransfers_getArticleTransfers_content_article_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getArticleTransfers_getArticleTransfers_content_article_owner_CommunityDTO_resourceIdentifier | null;
}

export type getArticleTransfers_getArticleTransfers_content_article_owner = getArticleTransfers_getArticleTransfers_content_article_owner_ArticleDTO | getArticleTransfers_getArticleTransfers_content_article_owner_PublicUserDTO | getArticleTransfers_getArticleTransfers_content_article_owner_CommunityDTO;

export interface getArticleTransfers_getArticleTransfers_content_article_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_comments_content {
  __typename: "CommentDTO";
  author: getArticleTransfers_getArticleTransfers_content_article_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getArticleTransfers_getArticleTransfers_content_article_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (getArticleTransfers_getArticleTransfers_content_article_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getArticleTransfers_getArticleTransfers_content_article {
  __typename: "ArticleDTO";
  associatedNfts: (getArticleTransfers_getArticleTransfers_content_article_associatedNfts | null)[] | null;
  resourceIdentifier: getArticleTransfers_getArticleTransfers_content_article_resourceIdentifier | null;
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
  voteResult: getArticleTransfers_getArticleTransfers_content_article_voteResult | null;
  author: getArticleTransfers_getArticleTransfers_content_article_author | null;
  owner: getArticleTransfers_getArticleTransfers_content_article_owner | null;
  comments: getArticleTransfers_getArticleTransfers_content_article_comments | null;
  updateComment: string | null;
}

export interface getArticleTransfers_getArticleTransfers_content_transferrer {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
  version: number | null;
}

export interface getArticleTransfers_getArticleTransfers_content_recipient {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
  version: number | null;
}

export interface getArticleTransfers_getArticleTransfers_content {
  __typename: "ArticleTransferDTO";
  id: string | null;
  article: getArticleTransfers_getArticleTransfers_content_article | null;
  transferrer: getArticleTransfers_getArticleTransfers_content_transferrer | null;
  recipient: getArticleTransfers_getArticleTransfers_content_recipient | null;
}

export interface getArticleTransfers_getArticleTransfers {
  __typename: "ResponsePage_ArticleTransferDTO";
  content: (getArticleTransfers_getArticleTransfers_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getArticleTransfers {
  getArticleTransfers: getArticleTransfers_getArticleTransfers | null;
}

export interface getArticleTransfersVariables {
  page?: number | null;
  size?: number | null;
  recipient?: string | null;
  sort?: string | null;
  dir?: DirectionInput | null;
}
