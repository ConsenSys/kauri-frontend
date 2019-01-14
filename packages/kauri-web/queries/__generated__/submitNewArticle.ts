/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitNewArticle
// ====================================================

export interface submitNewArticle_submitNewArticle {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface submitNewArticle {
  submitNewArticle: submitNewArticle_submitNewArticle | null;
}

export interface submitNewArticleVariables {
  title?: string | null;
  content?: string | null;
  tags?: (string | null)[] | null;
  attributes?: any | null;
}
