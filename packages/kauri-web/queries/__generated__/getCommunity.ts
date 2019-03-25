/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CommunityStatus, UserStatus, CommunityPermission, ResourceType, ArticleStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunity
// ====================================================

export interface getCommunity_getCommunity_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface getCommunity_getCommunity_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  status: UserStatus | null;
  role: CommunityPermission | null;
}

export interface getCommunity_getCommunity_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCommunity_getCommunity_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCommunity_getCommunity_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCommunity_getCommunity_approved_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getCommunity_getCommunity_approved_ArticleDTO {
  __typename: "ArticleDTO";
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getCommunity_getCommunity_approved_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
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
  type: ResourceType | null;
}

export interface getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_approved_CollectionDTO_owner = getCommunity_getCommunity_approved_CollectionDTO_owner_ArticleDTO | getCommunity_getCommunity_approved_CollectionDTO_owner_PublicUserDTO | getCommunity_getCommunity_approved_CollectionDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunity_getCommunity_approved_CollectionDTO_owner | null;
}

export type getCommunity_getCommunity_approved = getCommunity_getCommunity_approved_CommunityDTO | getCommunity_getCommunity_approved_ArticleDTO | getCommunity_getCommunity_approved_CollectionDTO;

export interface getCommunity_getCommunity_pending_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCommunity_getCommunity_pending_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getCommunity_getCommunity_pending_ArticleDTO {
  __typename: "ArticleDTO";
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getCommunity_getCommunity_pending_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
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
  type: ResourceType | null;
}

export interface getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunity_getCommunity_pending_CollectionDTO_owner = getCommunity_getCommunity_pending_CollectionDTO_owner_ArticleDTO | getCommunity_getCommunity_pending_CollectionDTO_owner_PublicUserDTO | getCommunity_getCommunity_pending_CollectionDTO_owner_CommunityDTO;

export interface getCommunity_getCommunity_pending_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunity_getCommunity_pending_CollectionDTO_owner | null;
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
  status: CommunityStatus | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
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
