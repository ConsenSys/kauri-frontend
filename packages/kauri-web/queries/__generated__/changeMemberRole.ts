/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CommunityPermissionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: changeMemberRole
// ====================================================

export interface changeMemberRole_changeMemberRole {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface changeMemberRole {
  changeMemberRole: changeMemberRole_changeMemberRole | null;
}

export interface changeMemberRoleVariables {
  signature?: string | null;
  id?: string | null;
  account?: string | null;
  role?: CommunityPermissionInput | null;
}
