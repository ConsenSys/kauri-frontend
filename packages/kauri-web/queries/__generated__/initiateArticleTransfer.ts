/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: initiateArticleTransfer
// ====================================================

export interface initiateArticleTransfer_initiateArticleTransfer {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface initiateArticleTransfer {
  initiateArticleTransfer: initiateArticleTransfer_initiateArticleTransfer | null;
}

export interface initiateArticleTransferVariables {
  id?: string | null;
  recipient?: ResourceIdentifierInput | null;
}
