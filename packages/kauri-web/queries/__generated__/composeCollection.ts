/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SectionDTOInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: composeCollection
// ====================================================

export interface composeCollection_composeCollection {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface composeCollection {
  composeCollection: composeCollection_composeCollection | null;
}

export interface composeCollectionVariables {
  id?: string | null;
  sections?: (SectionDTOInput | null)[] | null;
}
