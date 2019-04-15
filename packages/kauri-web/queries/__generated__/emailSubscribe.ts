/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSubscribe
// ====================================================

export interface emailSubscribe_emailSubscribe {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface emailSubscribe {
  emailSubscribe: emailSubscribe_emailSubscribe | null;
}

export interface emailSubscribeVariables {
  emailAddress?: string | null;
  subscriptions?: any;
}
