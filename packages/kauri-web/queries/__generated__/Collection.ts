/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Collection
// ====================================================

export interface Collection_owner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Collection_sections_resourcesId {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface Collection_sections {
  __typename: "SectionDTO";
  name: string | null;
  description: string | null;
  resourcesId: (Collection_sections_resourcesId | null)[] | null;
}

export interface Collection_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceType | null;
  id: string | null;
}

export interface Collection {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  owner: Collection_owner | null;
  sections: (Collection_sections | null)[] | null;
  resourceIdentifier: Collection_resourceIdentifier | null;
}
