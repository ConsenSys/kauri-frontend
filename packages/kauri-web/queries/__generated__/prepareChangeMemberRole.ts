/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CommunityPermissionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: prepareChangeMemberRole
// ====================================================

export interface prepareChangeMemberRole_prepareChangeMemberRole {
  __typename: "PrepareCommandResponseDTO";
  messageHash: string | null;
}

export interface prepareChangeMemberRole {
  prepareChangeMemberRole: prepareChangeMemberRole_prepareChangeMemberRole | null;
}

export interface prepareChangeMemberRoleVariables {
  id?: string | null;
  account?: string | null;
  role?: CommunityPermissionInput | null;
}
