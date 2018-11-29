/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  title: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
}

export interface getUser {
  getUser: getUser_getUser | null;
}

export interface getUserVariables {
  userId?: string | null;
}
