/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: publicProfile
// ====================================================

export interface publicProfile_getUser {
  __typename: 'PublicUserDTO';
  name: string | null;
}

export interface publicProfile {
  getUser: publicProfile_getUser | null;
}

export interface publicProfileVariables {
  id?: string | null;
}
