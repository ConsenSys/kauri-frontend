/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserStatusInput, CommunityPermissionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_getMyProfile_communities_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  role: CommunityPermissionInput | null;
}

export interface getMyProfile_getMyProfile_communities {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  members: (getMyProfile_getMyProfile_communities_members | null)[] | null;
}

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
  status: UserStatusInput | null;
  communities: (getMyProfile_getMyProfile_communities | null)[] | null;
  subscriptions: any | null;
  dateCreated: any | null;
}

export interface getMyProfile {
  getMyProfile: getMyProfile_getMyProfile | null;
}
