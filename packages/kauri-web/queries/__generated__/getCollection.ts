/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType, ArticleStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCollection
// ====================================================

export interface getCollection_getCollection_owner_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCollection_getCollection_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: getCollection_getCollection_owner_resourceIdentifier | null;
}

export interface getCollection_getCollection_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_CommunityDTO {
  __typename: "CommunityDTO" | "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getCollection_getCollection_sections_resources_ArticleDTO_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
}

export type getCollection_getCollection_sections_resources_ArticleDTO_owner = getCollection_getCollection_sections_resources_ArticleDTO_owner_CommunityDTO | getCollection_getCollection_sections_resources_ArticleDTO_owner_PublicUserDTO;

export interface getCollection_getCollection_sections_resources_ArticleDTO_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface getCollection_getCollection_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  authorId: string | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  owner: getCollection_getCollection_sections_resources_ArticleDTO_owner | null;
  status: ArticleStatus | null;
  attributes: any | null;
  vote: getCollection_getCollection_sections_resources_ArticleDTO_vote | null;
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
