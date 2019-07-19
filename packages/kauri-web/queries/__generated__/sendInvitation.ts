/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { InvitationInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: sendInvitation
// ====================================================

export interface sendInvitation_sendInvitation {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface sendInvitation {
  sendInvitation: sendInvitation_sendInvitation | null;
}

export interface sendInvitationVariables {
  signature?: string | null;
  id?: string | null;
  invitation?: InvitationInput | null;
}
