/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: HomepageComponentFragment
// ====================================================

export interface HomepageComponentFragment_AbstractComponent {
  __typename: "AbstractComponent" | "ResourceContentComponent" | "ResourceIdContentComponent" | "StaticContentComponent";
}

export interface HomepageComponentFragment_Categories_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  description: string | null;
  image: string | null;
  link: string | null;
}

export interface HomepageComponentFragment_Categories {
  __typename: "Categories";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_Categories_content | null)[] | null;
}

export interface HomepageComponentFragment_Featured_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner = HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_ArticleDTO | HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_PublicUserDTO | HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_CommunityDTO;

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resources = HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resources_CommunityDTO | HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner | null;
  sections: (HomepageComponentFragment_Featured_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner = HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_ArticleDTO | HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_PublicUserDTO | HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner_CommunityDTO;

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: HomepageComponentFragment_Featured_content_resource_ArticleDTO_voteResult | null;
  author: HomepageComponentFragment_Featured_content_resource_ArticleDTO_author | null;
  owner: HomepageComponentFragment_Featured_content_resource_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved = HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved_CommunityDTO | HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved_ArticleDTO | HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved_CollectionDTO;

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: HomepageComponentFragment_Featured_content_resource_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (HomepageComponentFragment_Featured_content_resource_CommunityDTO_approvedId | null)[] | null;
  pendingId: (HomepageComponentFragment_Featured_content_resource_CommunityDTO_pendingId | null)[] | null;
  approved: (HomepageComponentFragment_Featured_content_resource_CommunityDTO_approved | null)[] | null;
}

export type HomepageComponentFragment_Featured_content_resource = HomepageComponentFragment_Featured_content_resource_PublicUserDTO | HomepageComponentFragment_Featured_content_resource_CollectionDTO | HomepageComponentFragment_Featured_content_resource_ArticleDTO | HomepageComponentFragment_Featured_content_resource_CommunityDTO;

export interface HomepageComponentFragment_Featured_content {
  __typename: "ResourceIdentifier";
  resource: HomepageComponentFragment_Featured_content_resource | null;
}

export interface HomepageComponentFragment_Featured {
  __typename: "Featured";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_Featured_content | null)[] | null;
}

export interface HomepageComponentFragment_Actions_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  link: string | null;
}

export interface HomepageComponentFragment_Actions {
  __typename: "Actions";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_Actions_content | null)[] | null;
}

export interface HomepageComponentFragment_TopTags_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
}

export interface HomepageComponentFragment_TopTags {
  __typename: "TopTags";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_TopTags_content | null)[] | null;
}

export interface HomepageComponentFragment_TopContributors_content_user {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
}

export interface HomepageComponentFragment_TopContributors_content {
  __typename: "ResourceIdentifier";
  user: HomepageComponentFragment_TopContributors_content_user | null;
}

export interface HomepageComponentFragment_TopContributors {
  __typename: "TopContributors";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_TopContributors_content | null)[] | null;
}

export interface HomepageComponentFragment_Promo_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner = HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_ArticleDTO | HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_PublicUserDTO | HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_CommunityDTO;

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resources = HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resources_CommunityDTO | HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resources_ArticleDTO;

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections_resources | null)[] | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner | null;
  sections: (HomepageComponentFragment_Promo_content_resource_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner = HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_ArticleDTO | HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_PublicUserDTO | HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner_CommunityDTO;

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_ArticleDTO_resourceIdentifier | null;
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
  voteResult: HomepageComponentFragment_Promo_content_resource_ArticleDTO_voteResult | null;
  author: HomepageComponentFragment_Promo_content_resource_ArticleDTO_author | null;
  owner: HomepageComponentFragment_Promo_content_resource_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved = HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved_CommunityDTO | HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved_ArticleDTO | HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved_CollectionDTO;

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: HomepageComponentFragment_Promo_content_resource_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (HomepageComponentFragment_Promo_content_resource_CommunityDTO_approvedId | null)[] | null;
  pendingId: (HomepageComponentFragment_Promo_content_resource_CommunityDTO_pendingId | null)[] | null;
  approved: (HomepageComponentFragment_Promo_content_resource_CommunityDTO_approved | null)[] | null;
}

export type HomepageComponentFragment_Promo_content_resource = HomepageComponentFragment_Promo_content_resource_PublicUserDTO | HomepageComponentFragment_Promo_content_resource_CollectionDTO | HomepageComponentFragment_Promo_content_resource_ArticleDTO | HomepageComponentFragment_Promo_content_resource_CommunityDTO;

export interface HomepageComponentFragment_Promo_content {
  __typename: "ResourceIdentifier";
  resource: HomepageComponentFragment_Promo_content_resource | null;
}

export interface HomepageComponentFragment_Promo {
  __typename: "Promo";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_Promo_content | null)[] | null;
}

export interface HomepageComponentFragment_LatestContent_content_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type HomepageComponentFragment_LatestContent_content_CollectionDTO_owner = HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_ArticleDTO | HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_PublicUserDTO | HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_CommunityDTO;

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resources = HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resources_CommunityDTO | HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resources_ArticleDTO;

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  resourcesId: (HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resourcesId | null)[] | null;
  resources: (HomepageComponentFragment_LatestContent_content_CollectionDTO_sections_resources | null)[] | null;
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: HomepageComponentFragment_LatestContent_content_CollectionDTO_owner | null;
  sections: (HomepageComponentFragment_LatestContent_content_CollectionDTO_sections | null)[] | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_CollectionDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type HomepageComponentFragment_LatestContent_content_ArticleDTO_owner = HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_ArticleDTO | HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_PublicUserDTO | HomepageComponentFragment_LatestContent_content_ArticleDTO_owner_CommunityDTO;

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_ArticleDTO_resourceIdentifier | null;
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
  voteResult: HomepageComponentFragment_LatestContent_content_ArticleDTO_voteResult | null;
  author: HomepageComponentFragment_LatestContent_content_ArticleDTO_author | null;
  owner: HomepageComponentFragment_LatestContent_content_ArticleDTO_owner | null;
  updateComment: string | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_creator {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_approvedId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_pendingId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_approved_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_approved_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_approved_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
}

export type HomepageComponentFragment_LatestContent_content_CommunityDTO_approved = HomepageComponentFragment_LatestContent_content_CommunityDTO_approved_CommunityDTO | HomepageComponentFragment_LatestContent_content_CommunityDTO_approved_ArticleDTO | HomepageComponentFragment_LatestContent_content_CommunityDTO_approved_CollectionDTO;

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  creator: HomepageComponentFragment_LatestContent_content_CommunityDTO_creator | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  attributes: any | null;
  approvedId: (HomepageComponentFragment_LatestContent_content_CommunityDTO_approvedId | null)[] | null;
  pendingId: (HomepageComponentFragment_LatestContent_content_CommunityDTO_pendingId | null)[] | null;
  approved: (HomepageComponentFragment_LatestContent_content_CommunityDTO_approved | null)[] | null;
}

export type HomepageComponentFragment_LatestContent_content = HomepageComponentFragment_LatestContent_content_PublicUserDTO | HomepageComponentFragment_LatestContent_content_CollectionDTO | HomepageComponentFragment_LatestContent_content_ArticleDTO | HomepageComponentFragment_LatestContent_content_CommunityDTO;

export interface HomepageComponentFragment_LatestContent {
  __typename: "LatestContent";
  type: string | null;
  properties: any | null;
  content: (HomepageComponentFragment_LatestContent_content | null)[] | null;
}

export interface HomepageComponentFragment_Newsletter {
  __typename: "Newsletter";
  type: string | null;
  properties: any | null;
}

export interface HomepageComponentFragment_Import {
  __typename: "Import";
  type: string | null;
  properties: any | null;
}

export type HomepageComponentFragment = HomepageComponentFragment_AbstractComponent | HomepageComponentFragment_Categories | HomepageComponentFragment_Featured | HomepageComponentFragment_Actions | HomepageComponentFragment_TopTags | HomepageComponentFragment_TopContributors | HomepageComponentFragment_Promo | HomepageComponentFragment_LatestContent | HomepageComponentFragment_Newsletter | HomepageComponentFragment_Import;
