/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CommunityResourceFilterInput, ResourceTypeInput, ArticleStatusInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunityContent
// ====================================================

export interface getCommunityContent_getCommunityContent_content_resource_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner = getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_ArticleDTO | getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_PublicUserDTO | getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner_CommunityDTO;

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (getCommunityContent_getCommunityContent_content_resource_ArticleDTO_comments_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunityContent_getCommunityContent_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts: (getCommunityContent_getCommunityContent_content_resource_ArticleDTO_associatedNfts | null)[] | null;
  resourceIdentifier: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_voteResult | null;
  author: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_author | null;
  owner: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_owner | null;
  comments: getCommunityContent_getCommunityContent_content_resource_ArticleDTO_comments | null;
  updateComment: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner = getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_ArticleDTO | getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_PublicUserDTO | getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner_CommunityDTO;

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resources = getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resources_CommunityDTO | getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface getCommunityContent_getCommunityContent_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCommunityContent_getCommunityContent_content_resource_CollectionDTO_owner | null;
  sections: (getCommunityContent_getCommunityContent_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: getCommunityContent_getCommunityContent_content_resource_CollectionDTO_resourceIdentifier | null;
}

export type getCommunityContent_getCommunityContent_content_resource = getCommunityContent_getCommunityContent_content_resource_CommunityDTO | getCommunityContent_getCommunityContent_content_resource_ArticleDTO | getCommunityContent_getCommunityContent_content_resource_CollectionDTO;

export interface getCommunityContent_getCommunityContent_content {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  resource: getCommunityContent_getCommunityContent_content_resource | null;
}

export interface getCommunityContent_getCommunityContent {
  __typename: "ResponsePage_ResourceIdentifier";
  content: (getCommunityContent_getCommunityContent_content | null)[] | null;
  totalPages: number;
  totalElements: any;
}

export interface getCommunityContent {
  getCommunityContent: getCommunityContent_getCommunityContent | null;
}

export interface getCommunityContentVariables {
  id?: string | null;
  page?: number | null;
  size?: number | null;
  filter?: CommunityResourceFilterInput | null;
}
