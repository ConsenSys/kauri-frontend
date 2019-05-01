import gql from "graphql-tag";
import { Community } from "./Fragments";

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      ...Community
    }
  }
  ${Community}
`;

export const getAllCommunities = gql`
  query searchCommunities(
    $size: Int = 12
    $page: Int = 0
    $filter: CommunityFilterInput
    $sort: String = "dateUpdated"
    $dir: DirectionInput = DESC
  ) {
    searchCommunities(
      size: $size
      page: $page
      filter: $filter
      sort: $sort
      dir: $dir
    ) {
      content {
        id
        dateCreated
        dateUpdated
        creatorId
        name
        description
        status
        website
        avatar
        tags
        social
        approvedId {
          type
        }
      }
      isLast
    }
  }
`;

export const prepareCreateCommunityQuery = gql`
  query prepareCreateCommunity(
    $name: String
    $description: String
    $avatar: String
    $website: String
    $tags: [String]
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    prepareCreateCommunity(
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
      tags: $tags
    ) {
      messageHash
    }
  }
`;

export const createCommunityMutation = gql`
  mutation createCommunity(
    $signature: String
    $name: String
    $description: String
    $avatar: String
    $website: String
    $tags: [String]
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    createCommunity(
      signature: $signature
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
      tags: $tags
    ) {
      hash
    }
  }
`;

export const updateCommunityMutation = gql`
  mutation updateCommunity(
    $id: String
    $name: String
    $description: String
    $avatar: String
    $website: String
    $tags: [String]
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    editCommunity(
      id: $id
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      tags: $tags
      social: $social
      attributes: $attributes
    ) {
      hash
    }
  }
`;

export const curateCommunityResourcesMutation = gql`
  mutation curateCommunityResources(
    $id: String
    $resources: [ResourceIdentifierInput]
  ) {
    curateResources(id: $id, resources: $resources) {
      hash
    }
  }
`;
