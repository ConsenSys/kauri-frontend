/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType } from "./../../__generated__/globalTypes";

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
  __typename:
    | "CommunityDTO"
    | "PublicUserDTO"
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface getCollection_getCollection_sections_resources_CollectionDTO_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface getCollection_getCollection_sections_resources_CollectionDTO_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface getCollection_getCollection_sections_resources_CollectionDTO_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId:
    | (getCollection_getCollection_sections_resources_CollectionDTO_sections_resourcesId | null)[]
    | null;
}

export interface getCollection_getCollection_sections_resources_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface getCollection_getCollection_sections_resources_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: getCollection_getCollection_sections_resources_CollectionDTO_owner | null;
  sections:
    | (getCollection_getCollection_sections_resources_CollectionDTO_sections | null)[]
    | null;
  resourceIdentifier: getCollection_getCollection_sections_resources_CollectionDTO_resourceIdentifier | null;
}

export type getCollection_getCollection_sections_resources =
  | getCollection_getCollection_sections_resources_CommunityDTO
  | getCollection_getCollection_sections_resources_CollectionDTO;

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
