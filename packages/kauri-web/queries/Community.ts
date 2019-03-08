import gql from "graphql-tag";

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

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      id
      dateCreated
      dateUpdated
      creatorId
      name
      description
      status
      website
      avatar
      social
      attributes
      members {
        id
        name
        role
      }
      approvedId {
        type
      }
      pending {
        ... on ArticleDTO {
          id
          version
          title
          content
          dateCreated
          datePublished
          associatedNfts {
            tokenType
            contractAddress
            name
            image
            externalUrl
          }
          author {
            id
            name
          }
          status
          attributes
          voteResult {
            sum
          }
        }
        ... on CollectionDTO {
          id
          name
        }
      }
      approved {
        ... on ArticleDTO {
          id
          version
          title
          content
          description
          dateCreated
          datePublished
          associatedNfts {
            tokenType
            contractAddress
            name
            image
            externalUrl
          }
          author {
            id
            name
          }
          status
          attributes
          voteResult {
            sum
          }
        }
        ... on CollectionDTO {
          id
          name
        }
      }
    }
  }
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
