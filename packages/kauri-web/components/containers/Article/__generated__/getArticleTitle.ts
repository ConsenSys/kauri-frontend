/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArticleTitle
// ====================================================

export interface getArticleTitle_getArticle {
  __typename: "ArticleDTO";
  title: string | null;
}

export interface getArticleTitle {
  getArticle: getArticleTitle_getArticle | null;
}

export interface getArticleTitleVariables {
  id?: string | null;
  version?: number | null;
}
