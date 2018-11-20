/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTotalArticlesCount
// ====================================================

export interface getTotalArticlesCount_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  totalElements: any | null;
}

export interface getTotalArticlesCount {
  searchArticles: getTotalArticlesCount_searchArticles | null;
}

export interface getTotalArticlesCountVariables {
  category?: string | null;
}
