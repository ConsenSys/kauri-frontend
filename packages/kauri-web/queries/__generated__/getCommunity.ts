/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommunityStatusInput, ResourceTypeInput, ArticleStatusInput, CommunityPermissionInput, UserStatusInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunity
// ====================================================

export interface getCommunity_getCommunity_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface getCommunity_getCommunity_homepage_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_homepage_resources_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_homepage_resources_ArticleDTO_owner = getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_ArticleDTO | getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_PublicUserDTO | getCommunity_getCommunity_homepage_resources_ArticleDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_contributors {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface getCommunity_getCommunity_homepage_resources_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_ArticleDTO_resourceIdentifier | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  description: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getCommunity_getCommunity_homepage_resources_ArticleDTO_author | null;
  owner: getCommunity_getCommunity_homepage_resources_ArticleDTO_owner | null;
  contributors: (getCommunity_getCommunity_homepage_resources_ArticleDTO_contributors | null)[] | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  voteResult: getCommunity_getCommunity_homepage_resources_ArticleDTO_voteResult | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_homepage_resources_CollectionDTO_owner = getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_ArticleDTO | getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_PublicUserDTO | getCommunity_getCommunity_homepage_resources_CollectionDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId: (getCommunity_getCommunity_homepage_resources_CollectionDTO_sections_resourcesId | null)[] | null;
}

export interface getCommunity_getCommunity_homepage_resources_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateUpdated: any | null;
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_CollectionDTO_resourceIdentifier | null;
  owner: getCommunity_getCommunity_homepage_resources_CollectionDTO_owner | null;
  sections: (getCommunity_getCommunity_homepage_resources_CollectionDTO_sections | null)[] | null;
}

export interface getCommunity_getCommunity_homepage_resources_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunity_getCommunity_homepage_resources_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  resourceIdentifier: getCommunity_getCommunity_homepage_resources_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_homepage_resources = getCommunity_getCommunity_homepage_resources_PublicUserDTO | getCommunity_getCommunity_homepage_resources_ArticleDTO | getCommunity_getCommunity_homepage_resources_CollectionDTO | getCommunity_getCommunity_homepage_resources_CommunityDTO;

export interface getCommunity_getCommunity_homepage {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId: (getCommunity_getCommunity_homepage_resourcesId | null)[] | null;
  resources: (getCommunity_getCommunity_homepage_resources | null)[] | null;
}

export interface getCommunity_getCommunity_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  role: CommunityPermissionInput | null;
  status: UserStatusInput | null;
}

export interface getCommunity_getCommunity_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_approved_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_approved_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_approved_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_approved_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_approved_ArticleDTO_owner = getCommunity_getCommunity_approved_ArticleDTO_owner_ArticleDTO | getCommunity_getCommunity_approved_ArticleDTO_owner_PublicUserDTO | getCommunity_getCommunity_approved_ArticleDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_approved_ArticleDTO_contributors {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: getCommunity_getCommunity_approved_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (getCommunity_getCommunity_approved_ArticleDTO_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunity_getCommunity_approved_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts: (getCommunity_getCommunity_approved_ArticleDTO_associatedNfts | null)[] | null;
  resourceIdentifier: getCommunity_getCommunity_approved_ArticleDTO_resourceIdentifier | null;
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
  voteResult: getCommunity_getCommunity_approved_ArticleDTO_voteResult | null;
  author: getCommunity_getCommunity_approved_ArticleDTO_author | null;
  owner: getCommunity_getCommunity_approved_ArticleDTO_owner | null;
  contributors: (getCommunity_getCommunity_approved_ArticleDTO_contributors | null)[] | null;
  comments: getCommunity_getCommunity_approved_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_approved_CollectionDTO_owner = getCommunity_getCommunity_approved_CollectionDTO_owner_ArticleDTO | getCommunity_getCommunity_approved_CollectionDTO_owner_PublicUserDTO | getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_approved_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_approved_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getCommunity_getCommunity_approved_CollectionDTO_sections_resources = getCommunity_getCommunity_approved_CollectionDTO_sections_resources_CommunityDTO | getCommunity_getCommunity_approved_CollectionDTO_sections_resources_ArticleDTO;

export interface getCommunity_getCommunity_approved_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (getCommunity_getCommunity_approved_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (getCommunity_getCommunity_approved_CollectionDTO_sections_resources | null)[] | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunity_getCommunity_approved_CollectionDTO_owner | null;
  sections: (getCommunity_getCommunity_approved_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: getCommunity_getCommunity_approved_CollectionDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_approved = getCommunity_getCommunity_approved_CommunityDTO | getCommunity_getCommunity_approved_ArticleDTO | getCommunity_getCommunity_approved_CollectionDTO;

export interface getCommunity_getCommunity_pending_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_pending_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_pending_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_pending_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_pending_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_pending_ArticleDTO_owner = getCommunity_getCommunity_pending_ArticleDTO_owner_ArticleDTO | getCommunity_getCommunity_pending_ArticleDTO_owner_PublicUserDTO | getCommunity_getCommunity_pending_ArticleDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_pending_ArticleDTO_contributors {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: getCommunity_getCommunity_pending_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (getCommunity_getCommunity_pending_ArticleDTO_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunity_getCommunity_pending_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts: (getCommunity_getCommunity_pending_ArticleDTO_associatedNfts | null)[] | null;
  resourceIdentifier: getCommunity_getCommunity_pending_ArticleDTO_resourceIdentifier | null;
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
  voteResult: getCommunity_getCommunity_pending_ArticleDTO_voteResult | null;
  author: getCommunity_getCommunity_pending_ArticleDTO_author | null;
  owner: getCommunity_getCommunity_pending_ArticleDTO_owner | null;
  contributors: (getCommunity_getCommunity_pending_ArticleDTO_contributors | null)[] | null;
  comments: getCommunity_getCommunity_pending_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_pending_CollectionDTO_owner = getCommunity_getCommunity_pending_CollectionDTO_owner_ArticleDTO | getCommunity_getCommunity_pending_CollectionDTO_owner_PublicUserDTO | getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_pending_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunity_getCommunity_pending_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getCommunity_getCommunity_pending_CollectionDTO_sections_resources = getCommunity_getCommunity_pending_CollectionDTO_sections_resources_CommunityDTO | getCommunity_getCommunity_pending_CollectionDTO_sections_resources_ArticleDTO;

export interface getCommunity_getCommunity_pending_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (getCommunity_getCommunity_pending_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (getCommunity_getCommunity_pending_CollectionDTO_sections_resources | null)[] | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunity_getCommunity_pending_CollectionDTO_owner | null;
  sections: (getCommunity_getCommunity_pending_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: getCommunity_getCommunity_pending_CollectionDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_pending = getCommunity_getCommunity_pending_CommunityDTO | getCommunity_getCommunity_pending_ArticleDTO | getCommunity_getCommunity_pending_CollectionDTO;

export interface getCommunity_getCommunity {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: getCommunity_getCommunity_creator | null;
  name: string | null;
  description: string | null;
  status: CommunityStatusInput | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  homepage: (getCommunity_getCommunity_homepage | null)[] | null;
  members: (getCommunity_getCommunity_members | null)[] | null;
  approvedId: (getCommunity_getCommunity_approvedId | null)[] | null;
  pendingId: (getCommunity_getCommunity_pendingId | null)[] | null;
  approved: (getCommunity_getCommunity_approved | null)[] | null;
  pending: (getCommunity_getCommunity_pending | null)[] | null;
}

export interface getCommunity {
  getCommunity: getCommunity_getCommunity | null;
}

export interface getCommunityVariables {
  id?: string | null;
}
