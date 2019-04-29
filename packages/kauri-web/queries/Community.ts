import gql from "graphql-tag";
import { UserOwner } from "./User";

export const CommunityOwner = gql`
  fragment CommunityOwner on CommunityDTO {
    id
    name
    avatar
    resourceIdentifier {
      id
      type
    }
  }
`;
export const Community = gql`
  fragment Community on CommunityDTO {
    id
    dateCreated
    dateUpdated
    creatorId
    creator {
      id
      username
      name
    }
    name
    description
    status
    website
    avatar
    social
    tags
    attributes
    members {
      id
      name
      avatar
      role
    }
    approvedId {
      id
      type
    }
    pendingId {
      id
      type
    }
    approved {
      ... on ArticleDTO {
        id
        version
        title
        content
        dateCreated
        datePublished
        owner {
          ...UserOwner
          ...CommunityOwner
        }
        associatedNfts {
          tokenType
          contractAddress
          name
          image
          externalUrl
        }
        description
        author {
          id
          name
        }
        status
        attributes
      }

      ... on CollectionDTO {
        id
        name
        description
        tags
        background
        dateUpdated
        sections {
          id
          name
          description
          resourcesId {
            id
            type
          }
          resources {
            ... on ArticleDTO {
              id
              version
            }
          }
        }
        owner {
          ...UserOwner
          ...CommunityOwner
        }
      }
    }
    pending {
      ... on ArticleDTO {
        id
        version
        title
        content
        dateCreated
        datePublished
        owner {
          ...UserOwner
          ...CommunityOwner
        }
        associatedNfts {
          tokenType
          contractAddress
          name
          image
          externalUrl
        }
        description
        author {
          id
          name
        }
        status
        attributes
      }

      ... on CollectionDTO {
        id
        name
        description
        tags
        background
        dateUpdated
        sections {
          id
          name
          description
          resourcesId {
            id
            type
          }
          resources {
            ... on ArticleDTO {
              id
              version
            }
          }
        }
        owner {
          ...UserOwner
          ...CommunityOwner
        }
      }
    }
  }
`;

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      ...Community
    }
  }

  ${Community}
  ${UserOwner}
  ${CommunityOwner}
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

export const curateCommunityResourceMutation = gql`
  mutation curateCommunityResource(
    $id: String
    $resource: ResourceIdentifierInput
  ) {
    curateResource(id: $id, resource: $resource) {
      hash
    }
  }
`;
