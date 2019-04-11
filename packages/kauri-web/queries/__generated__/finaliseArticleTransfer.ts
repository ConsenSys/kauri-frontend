/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: finaliseArticleTransfer
// ====================================================

export interface finaliseArticleTransfer_finaliseArticleTransfer {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface finaliseArticleTransfer {
  finaliseArticleTransfer: finaliseArticleTransfer_finaliseArticleTransfer | null;
}

export interface finaliseArticleTransferVariables {
  id?: string | null;
  signature?: string | null;
}
