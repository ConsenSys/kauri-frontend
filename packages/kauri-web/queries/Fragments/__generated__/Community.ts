/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  CommunityStatusInput,
  CommunityPermissionInput,
  UserStatusInput,
  ResourceTypeInput,
  ArticleStatusInput,
} from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Community
// ====================================================

export interface Community_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface Community_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  role: CommunityPermissionInput | null;
  status: UserStatusInput | null;
}

export interface Community_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_approved_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_approved_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface Community_approved_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface Community_approved_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface Community_approved_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Community_approved_ArticleDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_approved_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_approved_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: Community_approved_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface Community_approved_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_approved_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: Community_approved_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type Community_approved_ArticleDTO_owner =
  | Community_approved_ArticleDTO_owner_ArticleDTO
  | Community_approved_ArticleDTO_owner_PublicUserDTO
  | Community_approved_ArticleDTO_owner_CommunityDTO;

export interface Community_approved_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Community_approved_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: Community_approved_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface Community_approved_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (Community_approved_ArticleDTO_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface Community_approved_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts:
    | (Community_approved_ArticleDTO_associatedNfts | null)[]
    | null;
  resourceIdentifier: Community_approved_ArticleDTO_resourceIdentifier | null;
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
  voteResult: Community_approved_ArticleDTO_voteResult | null;
  author: Community_approved_ArticleDTO_author | null;
  owner: Community_approved_ArticleDTO_owner | null;
  comments: Community_approved_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface Community_approved_CollectionDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_approved_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: Community_approved_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface Community_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_approved_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: Community_approved_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type Community_approved_CollectionDTO_owner =
  | Community_approved_CollectionDTO_owner_ArticleDTO
  | Community_approved_CollectionDTO_owner_PublicUserDTO
  | Community_approved_CollectionDTO_owner_CommunityDTO;

export interface Community_approved_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_approved_CollectionDTO_sections_resources_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_approved_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type Community_approved_CollectionDTO_sections_resources =
  | Community_approved_CollectionDTO_sections_resources_CommunityDTO
  | Community_approved_CollectionDTO_sections_resources_ArticleDTO;

export interface Community_approved_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId:
    | (Community_approved_CollectionDTO_sections_resourcesId | null)[]
    | null;
  resources:
    | (Community_approved_CollectionDTO_sections_resources | null)[]
    | null;
}

export interface Community_approved_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface Community_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: Community_approved_CollectionDTO_owner | null;
  sections: (Community_approved_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: Community_approved_CollectionDTO_resourceIdentifier | null;
}

export type Community_approved =
  | Community_approved_CommunityDTO
  | Community_approved_ArticleDTO
  | Community_approved_CollectionDTO;

export interface Community_pending_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_pending_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface Community_pending_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface Community_pending_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface Community_pending_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Community_pending_ArticleDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_pending_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_pending_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: Community_pending_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface Community_pending_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_pending_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: Community_pending_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type Community_pending_ArticleDTO_owner =
  | Community_pending_ArticleDTO_owner_ArticleDTO
  | Community_pending_ArticleDTO_owner_PublicUserDTO
  | Community_pending_ArticleDTO_owner_CommunityDTO;

export interface Community_pending_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Community_pending_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: Community_pending_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface Community_pending_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (Community_pending_ArticleDTO_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface Community_pending_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts: (Community_pending_ArticleDTO_associatedNfts | null)[] | null;
  resourceIdentifier: Community_pending_ArticleDTO_resourceIdentifier | null;
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
  voteResult: Community_pending_ArticleDTO_voteResult | null;
  author: Community_pending_ArticleDTO_author | null;
  owner: Community_pending_ArticleDTO_owner | null;
  comments: Community_pending_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface Community_pending_CollectionDTO_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_pending_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: Community_pending_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface Community_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_pending_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: Community_pending_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type Community_pending_CollectionDTO_owner =
  | Community_pending_CollectionDTO_owner_ArticleDTO
  | Community_pending_CollectionDTO_owner_PublicUserDTO
  | Community_pending_CollectionDTO_owner_CommunityDTO;

export interface Community_pending_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Community_pending_CollectionDTO_sections_resources_CommunityDTO {
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityInvitationDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface Community_pending_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type Community_pending_CollectionDTO_sections_resources =
  | Community_pending_CollectionDTO_sections_resources_CommunityDTO
  | Community_pending_CollectionDTO_sections_resources_ArticleDTO;

export interface Community_pending_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId:
    | (Community_pending_CollectionDTO_sections_resourcesId | null)[]
    | null;
  resources:
    | (Community_pending_CollectionDTO_sections_resources | null)[]
    | null;
}

export interface Community_pending_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface Community_pending_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: Community_pending_CollectionDTO_owner | null;
  sections: (Community_pending_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: Community_pending_CollectionDTO_resourceIdentifier | null;
}

export type Community_pending =
  | Community_pending_CommunityDTO
  | Community_pending_ArticleDTO
  | Community_pending_CollectionDTO;

export interface Community {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: Community_creator | null;
  name: string | null;
  description: string | null;
  status: CommunityStatusInput | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  members: (Community_members | null)[] | null;
  approvedId: (Community_approvedId | null)[] | null;
  pendingId: (Community_pendingId | null)[] | null;
  approved: (Community_approved | null)[] | null;
  pending: (Community_pending | null)[] | null;
}
