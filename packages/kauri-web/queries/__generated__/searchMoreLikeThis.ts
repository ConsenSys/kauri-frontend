/* tslint:disable */
// This file was automatically generated and should not be edited.

import {
  ResourceIdentifierInput,
  SearchFilterInput,
  ResourceType,
} from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchMoreLikeThis
// ====================================================

export interface searchMoreLikeThis_searchMoreLikeThis_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchMoreLikeThis_searchMoreLikeThis_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: searchMoreLikeThis_searchMoreLikeThis_content_resourceIdentifier | null;
  tags: (string | null)[] | null;
  name: string | null;
  description: string | null;
  score: number | null;
}

export interface searchMoreLikeThis_searchMoreLikeThis {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any | null;
  totalElementsBreakdown: any | null;
  totalPages: number | null;
  content: (searchMoreLikeThis_searchMoreLikeThis_content | null)[] | null;
}

export interface searchMoreLikeThis {
  searchMoreLikeThis: searchMoreLikeThis_searchMoreLikeThis | null;
}

export interface searchMoreLikeThisVariables {
  page?: number | null;
  size?: number | null;
  resourceId?: ResourceIdentifierInput | null;
  filter?: SearchFilterInput | null;
}
