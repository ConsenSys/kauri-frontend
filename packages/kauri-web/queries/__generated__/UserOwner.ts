/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserOwner
// ====================================================

export interface UserOwner_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface UserOwner {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: UserOwner_resourceIdentifier | null;
}
