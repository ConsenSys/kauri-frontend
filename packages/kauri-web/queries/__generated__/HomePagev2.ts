/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: HomePageV2
// ====================================================

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_AbstractComponent {
  __typename: "AbstractComponent" | "ResourceContentComponent" | "ResourceIdContentComponent" | "StaticContentComponent";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Categories_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  description: string | null;
  image: string | null;
  link: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Categories {
  __typename: "Categories";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_Categories_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner = HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_CommunityDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner_PublicUserDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_owner | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_author | null;
  ownerId: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO {
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
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO_resourceIdentifier | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource = HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_PublicUserDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CollectionDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_ArticleDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource_CommunityDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content {
  __typename: "ResourceIdentifier";
  resource: HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content_resource | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Featured {
  __typename: "Featured";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_Featured_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Actions_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  link: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Actions {
  __typename: "Actions";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_Actions_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_TopTags_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_TopTags {
  __typename: "TopTags";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_TopTags_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_TopContributors_content_user {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_TopContributors_content {
  __typename: "ResourceIdentifier";
  user: HomePageV2_getLatestHomepageDescriptor_rows_main_TopContributors_content_user | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_TopContributors {
  __typename: "TopContributors";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_TopContributors_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner = HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_CommunityDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner_PublicUserDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_owner | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_author | null;
  ownerId: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO {
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
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO_resourceIdentifier | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource = HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_PublicUserDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CollectionDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_ArticleDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource_CommunityDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content {
  __typename: "ResourceIdentifier";
  resource: HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content_resource | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Promo {
  __typename: "Promo";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_Promo_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner = HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_CommunityDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner_PublicUserDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_owner | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_author | null;
  ownerId: HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO {
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
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO_resourceIdentifier | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content = HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_PublicUserDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CollectionDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_ArticleDTO | HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content_CommunityDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent {
  __typename: "LatestContent";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Newsletter {
  __typename: "Newsletter";
  type: string | null;
  properties: any | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_main_Import {
  __typename: "Import";
  type: string | null;
  properties: any | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_main = HomePageV2_getLatestHomepageDescriptor_rows_main_AbstractComponent | HomePageV2_getLatestHomepageDescriptor_rows_main_Categories | HomePageV2_getLatestHomepageDescriptor_rows_main_Featured | HomePageV2_getLatestHomepageDescriptor_rows_main_Actions | HomePageV2_getLatestHomepageDescriptor_rows_main_TopTags | HomePageV2_getLatestHomepageDescriptor_rows_main_TopContributors | HomePageV2_getLatestHomepageDescriptor_rows_main_Promo | HomePageV2_getLatestHomepageDescriptor_rows_main_LatestContent | HomePageV2_getLatestHomepageDescriptor_rows_main_Newsletter | HomePageV2_getLatestHomepageDescriptor_rows_main_Import;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_AbstractComponent {
  __typename: "AbstractComponent" | "ResourceContentComponent" | "ResourceIdContentComponent" | "StaticContentComponent";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Categories_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  description: string | null;
  image: string | null;
  link: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Categories {
  __typename: "Categories";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Categories_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_CommunityDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner_PublicUserDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_owner | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_author | null;
  ownerId: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO {
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
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO_resourceIdentifier | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_PublicUserDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CollectionDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_ArticleDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource_CommunityDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content {
  __typename: "ResourceIdentifier";
  resource: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content_resource | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured {
  __typename: "Featured";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Actions_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
  link: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Actions {
  __typename: "Actions";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Actions_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopTags_content {
  __typename: "StaticContentElementDTO";
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopTags {
  __typename: "TopTags";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopTags_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content_user {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content {
  __typename: "ResourceIdentifier";
  user: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content_user | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors {
  __typename: "TopContributors";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_CommunityDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner_PublicUserDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_owner | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_author | null;
  ownerId: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO {
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
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO_resourceIdentifier | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_PublicUserDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CollectionDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_ArticleDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource_CommunityDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content {
  __typename: "ResourceIdentifier";
  resource: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content_resource | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo {
  __typename: "Promo";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_CommunityDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner_PublicUserDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_owner | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_author | null;
  ownerId: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO_resourceIdentifier | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO {
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
  resourceIdentifier: HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO_resourceIdentifier | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_PublicUserDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CollectionDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_ArticleDTO | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content_CommunityDTO;

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent {
  __typename: "LatestContent";
  type: string | null;
  properties: any | null;
  content: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent_content | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Newsletter {
  __typename: "Newsletter";
  type: string | null;
  properties: any | null;
}

export interface HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Import {
  __typename: "Import";
  type: string | null;
  properties: any | null;
}

export type HomePageV2_getLatestHomepageDescriptor_rows_sidebar = HomePageV2_getLatestHomepageDescriptor_rows_sidebar_AbstractComponent | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Categories | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Featured | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Actions | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopTags | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_TopContributors | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Promo | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_LatestContent | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Newsletter | HomePageV2_getLatestHomepageDescriptor_rows_sidebar_Import;

export interface HomePageV2_getLatestHomepageDescriptor_rows {
  __typename: "HomepageRowDTO";
  main: (HomePageV2_getLatestHomepageDescriptor_rows_main | null)[] | null;
  sidebar: (HomePageV2_getLatestHomepageDescriptor_rows_sidebar | null)[] | null;
}

export interface HomePageV2_getLatestHomepageDescriptor {
  __typename: "HomepageDescriptorDTO";
  rows: (HomePageV2_getLatestHomepageDescriptor_rows | null)[] | null;
}

export interface HomePageV2 {
  getLatestHomepageDescriptor: HomePageV2_getLatestHomepageDescriptor | null;
}

export interface HomePageV2Variables {
  populate?: boolean | null;
}
