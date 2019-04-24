/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ResourceFragment
// ====================================================

export interface ResourceFragment_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: ResourceFragment_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface ResourceFragment_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: ResourceFragment_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type ResourceFragment_CollectionDTO_owner = ResourceFragment_CollectionDTO_owner_ArticleDTO | ResourceFragment_CollectionDTO_owner_PublicUserDTO | ResourceFragment_CollectionDTO_owner_CommunityDTO;

export interface ResourceFragment_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type ResourceFragment_CollectionDTO_sections_resources = ResourceFragment_CollectionDTO_sections_resources_CommunityDTO | ResourceFragment_CollectionDTO_sections_resources_ArticleDTO;

export interface ResourceFragment_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (ResourceFragment_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (ResourceFragment_CollectionDTO_sections_resources | null)[] | null;
}

export interface ResourceFragment_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface ResourceFragment_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: ResourceFragment_CollectionDTO_owner | null;
  sections: (ResourceFragment_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: ResourceFragment_CollectionDTO_resourceIdentifier | null;
}

export interface ResourceFragment_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface ResourceFragment_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface ResourceFragment_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface ResourceFragment_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: ResourceFragment_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface ResourceFragment_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: ResourceFragment_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type ResourceFragment_ArticleDTO_owner = ResourceFragment_ArticleDTO_owner_ArticleDTO | ResourceFragment_ArticleDTO_owner_PublicUserDTO | ResourceFragment_ArticleDTO_owner_CommunityDTO;

export interface ResourceFragment_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: ResourceFragment_ArticleDTO_resourceIdentifier | null;
  description: string | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  voteResult: ResourceFragment_ArticleDTO_voteResult | null;
  author: ResourceFragment_ArticleDTO_author | null;
  owner: ResourceFragment_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface ResourceFragment_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface ResourceFragment_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface ResourceFragment_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface ResourceFragment_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type ResourceFragment_CommunityDTO_approved = ResourceFragment_CommunityDTO_approved_CommunityDTO | ResourceFragment_CommunityDTO_approved_ArticleDTO | ResourceFragment_CommunityDTO_approved_CollectionDTO;

export interface ResourceFragment_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: ResourceFragment_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (ResourceFragment_CommunityDTO_approvedId | null)[] | null;
  pendingId: (ResourceFragment_CommunityDTO_pendingId | null)[] | null;
  approved: (ResourceFragment_CommunityDTO_approved | null)[] | null;
}

export type ResourceFragment = ResourceFragment_PublicUserDTO | ResourceFragment_CollectionDTO | ResourceFragment_ArticleDTO | ResourceFragment_CommunityDTO;
