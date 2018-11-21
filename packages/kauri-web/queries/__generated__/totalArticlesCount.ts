/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleFilterInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: totalArticlesCount
// ====================================================

export interface totalArticlesCount_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  totalElements: any | null;
}

export interface totalArticlesCount {
  searchArticles: totalArticlesCount_searchArticles | null;
}

export interface totalArticlesCountVariables {
  filter?: ArticleFilterInput | null;
}
