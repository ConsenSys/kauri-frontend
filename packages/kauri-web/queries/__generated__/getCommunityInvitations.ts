/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DirectionInput, CommunityInvitationFilterInput, CommunityInvitationStatusInput, CommunityPermissionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCommunityInvitations
// ====================================================

export interface getCommunityInvitations_getCommunityInvitations_content {
  __typename: "CommunityInvitationDTO";
  invitationId: string | null;
  communityId: string | null;
  dateCreated: any | null;
  dateExpiration: any | null;
  dateClosed: any | null;
  status: CommunityInvitationStatusInput | null;
  recipientEmail: string | null;
  recipientRole: CommunityPermissionInput | null;
}

export interface getCommunityInvitations_getCommunityInvitations {
  __typename: "ResponsePage_CommunityInvitationDTO";
  totalElements: any;
  totalPages: number;
  content: (getCommunityInvitations_getCommunityInvitations_content | null)[] | null;
}

export interface getCommunityInvitations {
  getCommunityInvitations: getCommunityInvitations_getCommunityInvitations | null;
}

export interface getCommunityInvitationsVariables {
  id?: string | null;
  page?: number | null;
  size?: number | null;
  sort?: string | null;
  dir?: DirectionInput | null;
  filter?: CommunityInvitationFilterInput | null;
}
