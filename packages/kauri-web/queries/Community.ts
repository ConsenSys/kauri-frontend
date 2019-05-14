import gql from "graphql-tag";
import { Community, UserOwner, CommunityOwner } from "./Fragments";

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      ...Community
    }
  }
  ${Community}
`;

export const getCommunityAndPendingArticles = gql`
  query getCommunityAndPendingArticles(
    $id: String
    $size: Int = 8
    $page: Int = 0
  ) {
    getCommunity(id: $id) {
      ...Community
    }
    searchArticles(
      size: $size
      page: $page
      sort: "dateCreated"
      dir: DESC
      filter: { ownerIdEquals: $id, statusIn: [PENDING] }
    ) {
      totalElements
      isLast
      content {
        id
        version
        title
        description
        tags
        dateCreated
        datePublished
        author {
          id
          name
          username
          avatar
        }
        owner {
          ...UserOwner
          ...CommunityOwner
        }
        status
        attributes
        contentHash
        checkpoint
        voteResult {
          sum
        }
        comments {
          content {
            posted
            author {
              id
              name
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
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
    $invitations: InvitationInput[]
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
      $invitations: InvitationInput[]
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

export const approveResourceMutation = gql`
  mutation approveResource($id: String, $resource: ResourceIdentifierInput) {
    approveResource(id: $id, resource: $resource) {
      hash
    }
  }
`;

export const getCommunityArticleContent = gql`
  query getCommunityContent(
    $id: String
    $page: Int = 0
    $size: Int = 12
    $filter: CommunityResourceFilterInput
  ) {
    getCommunityContent(id: $id, page: $page, size: $size, filter: $filter) {
      content {
        id
        type
        resource {
          ... on ArticleDTO {
            id
            title
          }
          ... on CollectionDTO {
            id
            name
          }
        }
      }
      totalPages
      totalElements
    }
  }
`;
