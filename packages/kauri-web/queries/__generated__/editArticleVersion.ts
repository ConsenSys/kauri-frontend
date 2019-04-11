/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editArticleVersion
// ====================================================

export interface editArticleVersion_editArticleVersion {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface editArticleVersion {
  editArticleVersion: editArticleVersion_editArticleVersion | null;
}

export interface editArticleVersionVariables {
  id?: string | null;
  version?: number | null;
  text?: string | null;
  subject?: string | null;
  tags?: (string | null)[] | null;
  attributes?: any | null;
}
