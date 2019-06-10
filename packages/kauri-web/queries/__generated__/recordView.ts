/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: recordView
// ====================================================

export interface recordView_recordView {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface recordView {
  recordView: recordView_recordView | null;
}

export interface recordViewVariables {
  resourceId?: ResourceIdentifierInput | null;
}
