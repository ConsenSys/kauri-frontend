/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommunityStatus, CommunityPermission, ResourceType, ArticleStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunity
// ====================================================

export interface getCommunity_getCommunity_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  name: string | null;
  role: CommunityPermission | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_approvedId {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
}

export interface getCommunity_getCommunity_pending_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCommunity_getCommunity_pending_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  associatedNfts: (getCommunity_getCommunity_pending_ArticleDTO_associatedNfts | null)[] | null;
  author: getCommunity_getCommunity_pending_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
  voteResult: getCommunity_getCommunity_pending_ArticleDTO_voteResult | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
}

export type getCommunity_getCommunity_pending = getCommunity_getCommunity_pending_CommunityDTO | getCommunity_getCommunity_pending_ArticleDTO | getCommunity_getCommunity_pending_CollectionDTO;

export interface getCommunity_getCommunity_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCommunity_getCommunity_approved_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  description: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  associatedNfts: (getCommunity_getCommunity_approved_ArticleDTO_associatedNfts | null)[] | null;
  author: getCommunity_getCommunity_approved_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
  voteResult: getCommunity_getCommunity_approved_ArticleDTO_voteResult | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
}

export type getCommunity_getCommunity_approved = getCommunity_getCommunity_approved_CommunityDTO | getCommunity_getCommunity_approved_ArticleDTO | getCommunity_getCommunity_approved_CollectionDTO;

export interface getCommunity_getCommunity {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  status: CommunityStatus | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  members: (getCommunity_getCommunity_members | null)[] | null;
  approvedId: (getCommunity_getCommunity_approvedId | null)[] | null;
  pending: (getCommunity_getCommunity_pending | null)[] | null;
  approved: (getCommunity_getCommunity_approved | null)[] | null;
}

export interface getCommunity {
  getCommunity: getCommunity_getCommunity | null;
}

export interface getCommunityVariables {
  id?: string | null;
}
