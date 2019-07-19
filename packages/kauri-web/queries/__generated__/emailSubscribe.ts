/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSubscribe
// ====================================================

export interface emailSubscribe_subscribe {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface emailSubscribe {
  subscribe: emailSubscribe_subscribe | null;
}

export interface emailSubscribeVariables {
  emailAddress?: string | null;
  subscriptions?: any | null;
}
