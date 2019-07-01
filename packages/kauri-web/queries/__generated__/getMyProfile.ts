/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserStatusInput, CommunityPermissionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_getMyProfile_communities_community_members {
  __typename: "CommunityMemberDTO";
  id: string | null;
  role: CommunityPermissionInput | null;
}

export interface getMyProfile_getMyProfile_communities_community {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  members: (getMyProfile_getMyProfile_communities_community_members | null)[] | null;
}

export interface getMyProfile_getMyProfile_communities {
  __typename: "MemberRoleCommunityDTO";
  role: CommunityPermissionInput | null;
  community: getMyProfile_getMyProfile_communities_community | null;
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
