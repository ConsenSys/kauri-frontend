/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitArticle
// ====================================================

export interface submitArticle_submitArticle {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface submitArticle {
  submitArticle: submitArticle_submitArticle | null;
}

export interface submitArticleVariables {
  article_id?: string | null;
  text?: string | null;
  subject?: string | null;
  attributes?: any | null;
  version?: number | null;
}
