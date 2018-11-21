/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: approveArticle
// ====================================================

export interface approveArticle_approveArticle {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface approveArticle {
  approveArticle: approveArticle_approveArticle | null;
}

export interface approveArticleVariables {
  id?: string | null;
  version?: number | null;
  signature?: string | null;
}
