/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchTags
// ====================================================

export interface searchTags_searchTags_content {
  __typename: "TagResultDTO";
  tag: string | null;
  count: any | null;
  score: number | null;
}

export interface searchTags_searchTags {
  __typename: "Page_TagResultDTO";
  totalElements: any | null;
  totalPages: number | null;
  content: (searchTags_searchTags_content | null)[] | null;
}

export interface searchTags {
  searchTags: searchTags_searchTags | null;
}

export interface searchTagsVariables {
  page?: number | null;
  size?: number | null;
  query?: string | null;
}
