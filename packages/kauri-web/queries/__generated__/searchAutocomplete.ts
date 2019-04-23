/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SearchFilterInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchAutocomplete
// ====================================================

export interface searchAutocomplete_searchAutocomplete {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any;
  totalPages: number;
  totalElementsBreakdown: any | null;
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
