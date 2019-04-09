/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ResourceFragment
// ====================================================

export interface ResourceFragment_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_CollectionDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface ResourceFragment_CollectionDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type ResourceFragment_CollectionDTO_owner = ResourceFragment_CollectionDTO_owner_CommunityDTO | ResourceFragment_CollectionDTO_owner_PublicUserDTO;

export interface ResourceFragment_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface ResourceFragment_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateCreated: any | null;
  attributes: any | null;
  owner: ResourceFragment_CollectionDTO_owner | null;
  resourceIdentifier: ResourceFragment_CollectionDTO_resourceIdentifier | null;
}

export interface ResourceFragment_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface ResourceFragment_ArticleDTO_ownerId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface ResourceFragment_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
  version: number | null;
}

export interface ResourceFragment_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  authorId: string | null;
  author: ResourceFragment_ArticleDTO_author | null;
  ownerId: ResourceFragment_ArticleDTO_ownerId | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  resourceIdentifier: ResourceFragment_ArticleDTO_resourceIdentifier | null;
}

export interface ResourceFragment_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface ResourceFragment_CommunityDTO {
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
  resourceIdentifier: ResourceFragment_CommunityDTO_resourceIdentifier | null;
}

export type ResourceFragment = ResourceFragment_PublicUserDTO | ResourceFragment_CollectionDTO | ResourceFragment_ArticleDTO | ResourceFragment_CommunityDTO;
