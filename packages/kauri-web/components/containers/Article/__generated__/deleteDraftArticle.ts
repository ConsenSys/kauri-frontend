/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteDraftArticle
// ====================================================

export interface deleteDraftArticle_cancelArticle {
  __typename: 'MutationResponse';
  hash: string | null;
}

export interface deleteDraftArticle {
  cancelArticle: deleteDraftArticle_cancelArticle | null;
}

export interface deleteDraftArticleVariables {
  id?: string | null;
  version?: number | null;
}
