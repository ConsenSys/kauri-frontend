/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { InvitationInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: prepareSendInvitation
// ====================================================

export interface prepareSendInvitation_prepareSendInvitation {
  __typename: "PrepareCommandResponseDTO";
  messageHash: string | null;
  attributes: any | null;
}

export interface prepareSendInvitation {
  prepareSendInvitation: prepareSendInvitation_prepareSendInvitation | null;
}

export interface prepareSendInvitationVariables {
  id?: string | null;
  invitation?: InvitationInput | null;
}
