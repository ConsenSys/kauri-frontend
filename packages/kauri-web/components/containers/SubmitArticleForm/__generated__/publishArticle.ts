/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: publishArticle
// ====================================================

export interface publishArticle_publishArticle {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface publishArticle {
  publishArticle: publishArticle_publishArticle | null;
}

export interface publishArticleVariables {
  id?: string | null;
  version?: number | null;
  owner?: ResourceIdentifierInput | null;
  signature?: string | null;
  updateComment?: string | null;
}
