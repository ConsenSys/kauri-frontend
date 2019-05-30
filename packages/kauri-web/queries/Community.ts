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
    $invitations: [InvitationInput]
  ) {
    prepareCreateCommunity(
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
      tags: $tags
      invitations: $invitations
    ) {
      messageHash
      attributes
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
    $invitations: [InvitationInput]
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
      invitations: $invitations
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

export const removeResourceMutation = gql`
  mutation removeResource($id: String, $resource: ResourceIdentifierInput) {
    removeResource(id: $id, resource: $resource) {
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

export const prepareSendInvitationQuery = gql`
  query prepareSendInvitation($id: String, $invitation: InvitationInput) {
    prepareSendInvitation(id: $id, invitation: $invitation) {
      messageHash
      attributes
    }
  }
`;

export const sendInvitationMutation = gql`
  mutation sendInvitation(
    $signature: String
    $id: String
    $invitation: InvitationInput
  ) {
    sendInvitation(signature: $signature, id: $id, invitation: $invitation) {
      hash
    }
  }
`;

export const prepareAcceptInvitationQuery = gql`
  query prepareAcceptInvitation($id: String, $secret: String) {
    prepareAcceptInvitation(id: $id, secret: $secret) {
      messageHash
    }
  }
`;

export const acceptInvitationMutation = gql`
  mutation acceptInvitation($signature: String, $id: String, $secret: String) {
    acceptInvitation(signature: $signature, id: $id, secret: $secret) {
      hash
    }
  }
`;

export const prepareRevokeInvitationQuery = gql`
  query prepareRevokeInvitation($id: String, $invitationId: String) {
    prepareRevokeInvitation(id: $id, invitationId: $invitationId) {
      messageHash
    }
  }
`;

export const revokeInvitationMutation = gql`
  mutation revokeInvitation(
    $signature: String
    $id: String
    $invitationId: String
  ) {
    revokeInvitation(
      signature: $signature
      id: $id
      invitationId: $invitationId
    ) {
      hash
    }
  }
`;

export const getCommunityInvitationsQuery = gql`
  query getCommunityInvitations(
    $id: String
    $page: Int = 0
    $size: Int = 500
    $sort: String
    $dir: DirectionInput
  ) {
    getCommunityInvitations(
      id: $id
      page: $page
      size: $size
      sort: $sort
      dir: $dir
    ) {
      totalElements
      totalPages
      content {
        invitationId
        communityId
        dateCreated
        dateExpiration
        dateClosed
        status
        recipientEmail
        recipientRole
      }
    }
  }
`;

export const prepareRemoveMemberQuery = gql`
  query prepareRemoveMember($id: String, $account: String) {
    prepareRemoveMember(id: $id, account: $account) {
      messageHash
    }
  }
`;

export const removeMemberMutation = gql`
  mutation removeMember($signature: String, $id: String, $account: String) {
    removeMember(signature: $signature, id: $id, account: $account) {
      hash
    }
  }
`;

export const prepareChangeMemberRoleQuery = gql`
  query prepareChangeMemberRole(
    $id: String
    $account: String
    $role: CommunityPermissionInput
  ) {
    prepareChangeMemberRole(id: $id, account: $account, role: $role) {
      messageHash
    }
  }
`;

export const changeMemberRoleMutation = gql`
  mutation changeMemberRole(
    $signature: String
    $id: String
    $account: String
    $role: CommunityPermissionInput
  ) {
    changeMemberRole(
      signature: $signature
      id: $id
      account: $account
      role: $role
    ) {
      hash
    }
  }
`;

export const resendInvitationMutation = gql`
  mutation resendInvitation(
    $id: String
    $invitationId: String
    $email: String
  ) {
    resendInvitation(id: $id, invationId: $invitationId, email: $email) {
      hash
    }
  }
`;

export const initiateArticleTransferMutation = gql`
  mutation initiateArticleTransfer(
    $id: String
    $recipient: ResourceIdentifierInput
  ) {
    initiateArticleTransfer(id: $id, recipient: $recipient) {
      hash
    }
  }
`;
