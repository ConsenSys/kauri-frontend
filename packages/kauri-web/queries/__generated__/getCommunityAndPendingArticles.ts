/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  CommunityStatusInput,
  ResourceTypeInput,
  ArticleStatusInput,
  CommunityPermissionInput,
  UserStatusInput,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunityAndPendingArticles
// ====================================================

export interface getCommunityAndPendingArticles_getCommunity_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_PublicUserDTO {
  __typename:
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner =
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_resourceIdentifier | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  description: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_author | null;
  owner: getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_owner | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  voteResult: getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO_voteResult | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner =
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId:
    | (getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_sections_resourcesId | null)[]
    | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateUpdated: any | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_resourceIdentifier | null;
  owner: getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_owner | null;
  sections:
    | (getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO_sections | null)[]
    | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_homepage_resources_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_homepage_resources_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_homepage_resources =
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_CollectionDTO
  | getCommunityAndPendingArticles_getCommunity_homepage_resources_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_homepage {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId:
    | (getCommunityAndPendingArticles_getCommunity_homepage_resourcesId | null)[]
    | null;
  resources:
    | (getCommunityAndPendingArticles_getCommunity_homepage_resources | null)[]
    | null;
}

export interface getCommunityAndPendingArticles_getCommunity_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  role: CommunityPermissionInput | null;
  status: UserStatusInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner =
  | getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_comments_content | null)[]
    | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts:
    | (getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_associatedNfts | null)[]
    | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_resourceIdentifier | null;
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
  voteResult: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_voteResult | null;
  author: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_author | null;
  owner: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_owner | null;
  comments: getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner =
  | getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resources_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resources =
  | getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resources_CommunityDTO
  | getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resources_ArticleDTO;

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId:
    | (getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resourcesId | null)[]
    | null;
  resources:
    | (getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections_resources | null)[]
    | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_owner | null;
  sections:
    | (getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_sections | null)[]
    | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_approved =
  | getCommunityAndPendingArticles_getCommunity_approved_CommunityDTO
  | getCommunityAndPendingArticles_getCommunity_approved_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_approved_CollectionDTO;

export interface getCommunityAndPendingArticles_getCommunity_pending_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner =
  | getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_comments_content | null)[]
    | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts:
    | (getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_associatedNfts | null)[]
    | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_resourceIdentifier | null;
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
  voteResult: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_voteResult | null;
  author: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_author | null;
  owner: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_owner | null;
  comments: getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner =
  | getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_PublicUserDTO
  | getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resources_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resources =
  | getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resources_CommunityDTO
  | getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resources_ArticleDTO;

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId:
    | (getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resourcesId | null)[]
    | null;
  resources:
    | (getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections_resources | null)[]
    | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_owner | null;
  sections:
    | (getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_sections | null)[]
    | null;
  resourceIdentifier: getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_getCommunity_pending =
  | getCommunityAndPendingArticles_getCommunity_pending_CommunityDTO
  | getCommunityAndPendingArticles_getCommunity_pending_ArticleDTO
  | getCommunityAndPendingArticles_getCommunity_pending_CollectionDTO;

export interface getCommunityAndPendingArticles_getCommunity {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: getCommunityAndPendingArticles_getCommunity_creator | null;
  name: string | null;
  description: string | null;
  status: CommunityStatusInput | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  homepage:
    | (getCommunityAndPendingArticles_getCommunity_homepage | null)[]
    | null;
  members:
    | (getCommunityAndPendingArticles_getCommunity_members | null)[]
    | null;
  approvedId:
    | (getCommunityAndPendingArticles_getCommunity_approvedId | null)[]
    | null;
  pendingId:
    | (getCommunityAndPendingArticles_getCommunity_pendingId | null)[]
    | null;
  approved:
    | (getCommunityAndPendingArticles_getCommunity_approved | null)[]
    | null;
  pending:
    | (getCommunityAndPendingArticles_getCommunity_pending | null)[]
    | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO"
    | "CuratedListDTO";
}

export interface getCommunityAndPendingArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityAndPendingArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityAndPendingArticles_searchArticles_content_owner =
  | getCommunityAndPendingArticles_searchArticles_content_owner_ArticleDTO
  | getCommunityAndPendingArticles_searchArticles_content_owner_PublicUserDTO
  | getCommunityAndPendingArticles_searchArticles_content_owner_CommunityDTO;

export interface getCommunityAndPendingArticles_searchArticles_content_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  posted: any | null;
  author: getCommunityAndPendingArticles_searchArticles_content_comments_content_author | null;
  body: string | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (getCommunityAndPendingArticles_searchArticles_content_comments_content | null)[]
    | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunityAndPendingArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
  version: number | null;
}

export interface getCommunityAndPendingArticles_searchArticles_content {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getCommunityAndPendingArticles_searchArticles_content_author | null;
  owner: getCommunityAndPendingArticles_searchArticles_content_owner | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  voteResult: getCommunityAndPendingArticles_searchArticles_content_voteResult | null;
  comments: getCommunityAndPendingArticles_searchArticles_content_comments | null;
  resourceIdentifier: getCommunityAndPendingArticles_searchArticles_content_resourceIdentifier | null;
}

export interface getCommunityAndPendingArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  totalElements: any;
  isLast: boolean;
  content:
    | (getCommunityAndPendingArticles_searchArticles_content | null)[]
    | null;
}

export interface getCommunityAndPendingArticles {
  getCommunity: getCommunityAndPendingArticles_getCommunity | null;
  searchArticles: getCommunityAndPendingArticles_searchArticles | null;
}

export interface getCommunityAndPendingArticlesVariables {
  id?: string | null;
  size?: number | null;
  page?: number | null;
}
