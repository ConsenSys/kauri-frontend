/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: rejectArticle
// ====================================================

export interface rejectArticle_rejectArticle {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface rejectArticle {
  rejectArticle: rejectArticle_rejectArticle | null;
}

export interface rejectArticleVariables {
  id?: string | null;
  version?: number | null;
  cause?: string | null;
}
