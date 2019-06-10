import gql from "graphql-tag";

export const User = gql`
  fragment User on PublicUserDTO {
    id
    name
  }
`;

export const UserOwner = gql`
  fragment UserOwner on PublicUserDTO {
    id
    name
    username
    avatar
    resourceIdentifier {
      id
      type
    }
  }
`;

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

export const Article = gql`
  fragment Article on ArticleDTO {
    associatedNfts {
      tokenType
      contractAddress
      name
      image
      externalUrl
    }
    resourceIdentifier {
      id
      type
    }
    description
    id
    version
    title
    content
    description
    authorId
    dateCreated
    datePublished
    status
    attributes
    contentHash
    checkpoint
    tags
    voteResult {
      sum
      count
      hasVoted
      quantity
    }
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
    comments {
      content {
        author {
          id
          name
          username
          avatar
        }
        posted
        body
      }
      totalPages
      totalElements
    }
    resourceIdentifier {
      id
      type
      version
    }
    updateComment
  }

  ${UserOwner}
  ${CommunityOwner}
`;

export const Collection = gql`
  fragment Collection on CollectionDTO {
    id
    name
    description
    tags
    background
    dateUpdated
    owner {
      ...UserOwner
      ...CommunityOwner
    }
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
    resourceIdentifier {
      type
      id
    }
  }
  ${UserOwner}
  ${CommunityOwner}
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
    homepage {
      name
      description
      resources {
        ... on ArticleDTO {
          resourceIdentifier {
            type
            id
          }
          id
          version
          title
          content
          description
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
          voteResult {
            sum
          }
        }
        ... on CollectionDTO {
          id
          name
          description
          background
          dateUpdated
          resourceIdentifier {
            type
            id
          }
          owner {
            ...UserOwner
            ...CommunityOwner
          }
          sections {
            name
            description
            resourcesId {
              id
              type
            }
          }
        }
        ... on CommunityDTO {
          id
          name
          resourceIdentifier {
            type
            id
          }
        }
      }
    }
    members {
      id
      name
      username
      avatar
      role
      status
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
        ...Article
      }

      ... on CollectionDTO {
        ...Collection
      }
    }
    pending {
      ... on ArticleDTO {
        ...Article
      }

      ... on CollectionDTO {
        ...Collection
      }
    }
  }
  ${Article}
  ${Collection}
`;
