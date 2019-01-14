/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SearchFilterInput, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchAutocomplete
// ====================================================

export interface searchAutocomplete_searchAutocomplete_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchAutocomplete_searchAutocomplete_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: searchAutocomplete_searchAutocomplete_content_resourceIdentifier | null;
  tags: (string | null)[] | null;
  name: string | null;
  description: string | null;
  score: number | null;
}

export interface searchAutocomplete_searchAutocomplete {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any | null;
  totalPages: number | null;
  totalElementsBreakdown: any | null;
  content: (searchAutocomplete_searchAutocomplete_content | null)[] | null;
}

export interface searchAutocomplete {
  searchAutocomplete: searchAutocomplete_searchAutocomplete | null;
}

export interface searchAutocompleteVariables {
  page?: number | null;
  size?: number | null;
  query?: string | null;
  filter?: SearchFilterInput | null;
}
