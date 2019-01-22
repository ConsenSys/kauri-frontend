/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: saveUser
// ====================================================

export interface saveUser_saveUser {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface saveUser {
  saveUser: saveUser_saveUser | null;
}

export interface saveUserVariables {
  username?: string | null;
  name?: string | null;
  title?: string | null;
  website?: string | null;
  avatar?: string | null;
  email?: string | null;
  social?: any | null;
  subscriptions?: any | null;
}
