/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: homePageContent
// ====================================================

export interface homePageContent_getLatestHomepageDescriptor_rows_main_AbstractComponent {
  __typename: "AbstractComponent" | "ResourceContentComponent" | "ResourceIdContentComponent" | "StaticContentComponent";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Categories_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  description: string | null;
  image: string | null;
  link: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Categories {
  __typename: "Categories";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_Categories_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resources = homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resources_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner | null;
  sections: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_voteResult | null;
  author: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_author | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved = homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved_CollectionDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approvedId | null)[] | null;
  pendingId: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_pendingId | null)[] | null;
  approved: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_approved | null)[] | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource = homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content {
  __typename: "ResourceIdentifier";
  resource: homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content_resource | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Featured {
  __typename: "Featured";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_Featured_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Actions_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  link: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Actions {
  __typename: "Actions";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_Actions_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_TopTags_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_TopTags {
  __typename: "TopTags";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_TopTags_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_TopContributors_content_user {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_TopContributors_content {
  __typename: "ResourceIdentifier";
  user: homePageContent_getLatestHomepageDescriptor_rows_main_TopContributors_content_user | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_TopContributors {
  __typename: "TopContributors";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_TopContributors_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resources = homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resources_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner | null;
  sections: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_voteResult | null;
  author: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_author | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved = homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved_CollectionDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approvedId | null)[] | null;
  pendingId: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_pendingId | null)[] | null;
  approved: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_approved | null)[] | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource = homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content {
  __typename: "ResourceIdentifier";
  resource: homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content_resource | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Promo {
  __typename: "Promo";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_Promo_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resources = homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resources_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resources_ArticleDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections_resources | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner | null;
  sections: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_resourceIdentifier | null;
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
  voteResult: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_voteResult | null;
  author: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_author | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved = homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved_CollectionDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approvedId | null)[] | null;
  pendingId: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_pendingId | null)[] | null;
  approved: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_approved | null)[] | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content = homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent {
  __typename: "LatestContent";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Newsletter {
  __typename: "Newsletter";
  type: string | null;
  properties: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_main_Import {
  __typename: "Import";
  type: string | null;
  properties: any | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_main = homePageContent_getLatestHomepageDescriptor_rows_main_AbstractComponent | homePageContent_getLatestHomepageDescriptor_rows_main_Categories | homePageContent_getLatestHomepageDescriptor_rows_main_Featured | homePageContent_getLatestHomepageDescriptor_rows_main_Actions | homePageContent_getLatestHomepageDescriptor_rows_main_TopTags | homePageContent_getLatestHomepageDescriptor_rows_main_TopContributors | homePageContent_getLatestHomepageDescriptor_rows_main_Promo | homePageContent_getLatestHomepageDescriptor_rows_main_LatestContent | homePageContent_getLatestHomepageDescriptor_rows_main_Newsletter | homePageContent_getLatestHomepageDescriptor_rows_main_Import;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_AbstractComponent {
  __typename: "AbstractComponent" | "ResourceContentComponent" | "ResourceIdContentComponent" | "StaticContentComponent";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Categories_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  description: string | null;
  image: string | null;
  link: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Categories {
  __typename: "Categories";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Categories_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resources = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resources_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner | null;
  sections: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_voteResult | null;
  author: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_author | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved_CollectionDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approvedId | null)[] | null;
  pendingId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_pendingId | null)[] | null;
  approved: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_approved | null)[] | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content {
  __typename: "ResourceIdentifier";
  resource: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured {
  __typename: "Featured";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Actions_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  link: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Actions {
  __typename: "Actions";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Actions_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopTags_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopTags {
  __typename: "TopTags";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopTags_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content_user {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content {
  __typename: "ResourceIdentifier";
  user: homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content_user | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopContributors {
  __typename: "TopContributors";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resources = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resources_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner | null;
  sections: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_voteResult | null;
  author: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_author | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved_CollectionDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approvedId | null)[] | null;
  pendingId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_pendingId | null)[] | null;
  approved: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_approved | null)[] | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource = homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content {
  __typename: "ResourceIdentifier";
  resource: homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo {
  __typename: "Promo";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resources = homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resources_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resources_ArticleDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections_resources | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner | null;
  sections: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner = homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_resourceIdentifier | null;
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
  voteResult: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_voteResult | null;
  author: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_author | null;
  owner: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved = homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved_CommunityDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved_CollectionDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approvedId | null)[] | null;
  pendingId: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_pendingId | null)[] | null;
  approved: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_approved | null)[] | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content = homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_PublicUserDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO;

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent {
  __typename: "LatestContent";
  type: string | null;
  properties: any | null;
  content: (homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Newsletter {
  __typename: "Newsletter";
  type: string | null;
  properties: any | null;
}

export interface homePageContent_getLatestHomepageDescriptor_rows_sidebar_Import {
  __typename: "Import";
  type: string | null;
  properties: any | null;
}

export type homePageContent_getLatestHomepageDescriptor_rows_sidebar = homePageContent_getLatestHomepageDescriptor_rows_sidebar_AbstractComponent | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Categories | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Featured | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Actions | homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopTags | homePageContent_getLatestHomepageDescriptor_rows_sidebar_TopContributors | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Promo | homePageContent_getLatestHomepageDescriptor_rows_sidebar_LatestContent | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Newsletter | homePageContent_getLatestHomepageDescriptor_rows_sidebar_Import;

export interface homePageContent_getLatestHomepageDescriptor_rows {
  __typename: "HomepageRowDTO";
  main: (homePageContent_getLatestHomepageDescriptor_rows_main | null)[] | null;
  sidebar: (homePageContent_getLatestHomepageDescriptor_rows_sidebar | null)[] | null;
}

export interface homePageContent_getLatestHomepageDescriptor {
  __typename: "HomepageDescriptorDTO";
  rows: (homePageContent_getLatestHomepageDescriptor_rows | null)[] | null;
}

export interface homePageContent {
  getLatestHomepageDescriptor: homePageContent_getLatestHomepageDescriptor | null;
}

export interface homePageContentVariables {
  populate?: boolean | null;
}
