/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_getMyProfile {
  __typename: "UserDTO";
  id: string | null;
  email: string | null;
  username: string | null;
  name: string | null;
  title: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
}

export interface getMyProfile {
  getMyProfile: getMyProfile_getMyProfile | null;
}
