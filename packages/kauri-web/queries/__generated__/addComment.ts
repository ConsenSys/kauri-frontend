/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addComment
// ====================================================

export interface addComment_addComment {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface addComment {
  addComment: addComment_addComment | null;
}

export interface addCommentVariables {
  parent?: ResourceIdentifierInput | null;
  body?: string | null;
}
