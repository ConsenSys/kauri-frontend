/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getAllCuratedList
// ====================================================

export interface getAllCuratedList_getAllCuratedList_links {
  __typename: "Link";
  label: string | null;
  url: string | null;
  type: string | null;
}

export interface getAllCuratedList_getAllCuratedList_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getAllCuratedList_getAllCuratedList_header_CommentDTO {
  __typename:
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface getAllCuratedList_getAllCuratedList_header_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getAllCuratedList_getAllCuratedList_header_ArticleDTO_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface getAllCuratedList_getAllCuratedList_header_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getAllCuratedList_getAllCuratedList_header_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
  vote: getAllCuratedList_getAllCuratedList_header_ArticleDTO_vote | null;
}

export interface getAllCuratedList_getAllCuratedList_header_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  attributes: any | null;
  background: string | null;
}

export interface getAllCuratedList_getAllCuratedList_header_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
}

export interface getAllCuratedList_getAllCuratedList_header_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export type getAllCuratedList_getAllCuratedList_header =
  | getAllCuratedList_getAllCuratedList_header_CommentDTO
  | getAllCuratedList_getAllCuratedList_header_ArticleDTO
  | getAllCuratedList_getAllCuratedList_header_CollectionDTO
  | getAllCuratedList_getAllCuratedList_header_CommunityDTO
  | getAllCuratedList_getAllCuratedList_header_PublicUserDTO;

export interface getAllCuratedList_getAllCuratedList_resources_PublicUserDTO {
  __typename:
    | "PublicUserDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface getAllCuratedList_getAllCuratedList_resources_ArticleDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_ArticleDTO_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_ArticleDTO {
  __typename: "ArticleDTO";
  resourceIdentifier: getAllCuratedList_getAllCuratedList_resources_ArticleDTO_resourceIdentifier | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getAllCuratedList_getAllCuratedList_resources_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
  vote: getAllCuratedList_getAllCuratedList_resources_ArticleDTO_vote | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CollectionDTO_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CollectionDTO_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId:
    | (getAllCuratedList_getAllCuratedList_resources_CollectionDTO_sections_resourcesId | null)[]
    | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  background: string | null;
  dateUpdated: any | null;
  resourceIdentifier: getAllCuratedList_getAllCuratedList_resources_CollectionDTO_resourceIdentifier | null;
  owner: getAllCuratedList_getAllCuratedList_resources_CollectionDTO_owner | null;
  sections:
    | (getAllCuratedList_getAllCuratedList_resources_CollectionDTO_sections | null)[]
    | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface getAllCuratedList_getAllCuratedList_resources_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  resourceIdentifier: getAllCuratedList_getAllCuratedList_resources_CommunityDTO_resourceIdentifier | null;
}

export type getAllCuratedList_getAllCuratedList_resources =
  | getAllCuratedList_getAllCuratedList_resources_PublicUserDTO
  | getAllCuratedList_getAllCuratedList_resources_ArticleDTO
  | getAllCuratedList_getAllCuratedList_resources_CollectionDTO
  | getAllCuratedList_getAllCuratedList_resources_CommunityDTO;

export interface getAllCuratedList_getAllCuratedList {
  __typename: "CuratedListDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  featured: boolean | null;
  dateCreated: any | null;
  links: (getAllCuratedList_getAllCuratedList_links | null)[] | null;
  owner: getAllCuratedList_getAllCuratedList_owner | null;
  header: getAllCuratedList_getAllCuratedList_header | null;
  resources: (getAllCuratedList_getAllCuratedList_resources | null)[] | null;
}

export interface getAllCuratedList {
  getAllCuratedList: (getAllCuratedList_getAllCuratedList | null)[] | null;
}
