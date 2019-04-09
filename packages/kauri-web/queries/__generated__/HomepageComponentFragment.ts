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

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner = HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_CommunityDTO | HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner_PublicUserDTO;

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
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomepageComponentFragment_Featured_content_resource_CollectionDTO_owner | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomepageComponentFragment_Featured_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomepageComponentFragment_Featured_content_resource_ArticleDTO_author | null;
  ownerId: HomepageComponentFragment_Featured_content_resource_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomepageComponentFragment_Featured_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  metadataLocator: string | null;
  resourceIdentifier: HomepageComponentFragment_Featured_content_resource_CommunityDTO_resourceIdentifier | null;
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

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner = HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_CommunityDTO | HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner_PublicUserDTO;

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
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomepageComponentFragment_Promo_content_resource_CollectionDTO_owner | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomepageComponentFragment_Promo_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomepageComponentFragment_Promo_content_resource_ArticleDTO_author | null;
  ownerId: HomepageComponentFragment_Promo_content_resource_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomepageComponentFragment_Promo_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  metadataLocator: string | null;
  resourceIdentifier: HomepageComponentFragment_Promo_content_resource_CommunityDTO_resourceIdentifier | null;
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

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomepageComponentFragment_LatestContent_content_CollectionDTO_owner = HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_CommunityDTO | HomepageComponentFragment_LatestContent_content_CollectionDTO_owner_PublicUserDTO;

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
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomepageComponentFragment_LatestContent_content_CollectionDTO_owner | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_CollectionDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomepageComponentFragment_LatestContent_content_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomepageComponentFragment_LatestContent_content_ArticleDTO_author | null;
  ownerId: HomepageComponentFragment_LatestContent_content_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_ArticleDTO_resourceIdentifier | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomepageComponentFragment_LatestContent_content_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
  tags: (string | null)[] | null;
  metadataLocator: string | null;
  resourceIdentifier: HomepageComponentFragment_LatestContent_content_CommunityDTO_resourceIdentifier | null;
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
