/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType, ArticleStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCollection
// ====================================================

export interface getCollection_getCollection_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollection_getCollection_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCollection_getCollection_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCollection_getCollection_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCollection_getCollection_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCollection_getCollection_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCollection_getCollection_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCollection_getCollection_owner = getCollection_getCollection_owner_ArticleDTO | getCollection_getCollection_owner_PublicUserDTO | getCollection_getCollection_owner_CommunityDTO;

export interface getCollection_getCollection_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_contributors {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCollection_getCollection_sections_resources_ArticleDTO_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: getCollection_getCollection_sections_resources_ArticleDTO_owner_CommunityDTO_resourceIdentifier | null;
}

export type getCollection_getCollection_sections_resources_ArticleDTO_owner = getCollection_getCollection_sections_resources_ArticleDTO_owner_ArticleDTO | getCollection_getCollection_sections_resources_ArticleDTO_owner_PublicUserDTO | getCollection_getCollection_sections_resources_ArticleDTO_owner_CommunityDTO;

export interface getCollection_getCollection_sections_resources_ArticleDTO_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_comments_content {
  __typename: "CommentDTO";
  author: getCollection_getCollection_sections_resources_ArticleDTO_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (getCollection_getCollection_sections_resources_ArticleDTO_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  associatedNfts: (getCollection_getCollection_sections_resources_ArticleDTO_associatedNfts | null)[] | null;
  resourceIdentifier: getCollection_getCollection_sections_resources_ArticleDTO_resourceIdentifier | null;
  description: string | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  voteResult: getCollection_getCollection_sections_resources_ArticleDTO_voteResult | null;
  contributors: (getCollection_getCollection_sections_resources_ArticleDTO_contributors | null)[] | null;
  author: getCollection_getCollection_sections_resources_ArticleDTO_author | null;
  owner: getCollection_getCollection_sections_resources_ArticleDTO_owner | null;
  comments: getCollection_getCollection_sections_resources_ArticleDTO_comments | null;
  updateComment: string | null;
}

export type getCollection_getCollection_sections_resources = getCollection_getCollection_sections_resources_CommunityDTO | getCollection_getCollection_sections_resources_ArticleDTO;

export interface getCollection_getCollection_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resources: (getCollection_getCollection_sections_resources | null)[] | null;
}

export interface getCollection_getCollection_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface getCollection_getCollection {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateCreated: any | null;
  owner: getCollection_getCollection_owner | null;
  sections: (getCollection_getCollection_sections | null)[] | null;
  resourceIdentifier: getCollection_getCollection_resourceIdentifier | null;
}

export interface getCollection {
  getCollection: getCollection_getCollection | null;
}

export interface getCollectionVariables {
  id?: string | null;
}
