/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: vote
// ====================================================

export interface vote_vote {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface vote {
  vote: vote_vote | null;
}

export interface voteVariables {
  resourceId?: ResourceIdentifierInput | null;
  value?: number | null;
}
