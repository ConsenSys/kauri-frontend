import gql from "graphql-tag";

export const Tag = gql`
  fragment Article on ArticleDTO {
    id
    version
    title
    content
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
    }
    author {
      id
      name
      username
      avatar
    }
    owner {
      ... on PublicUserDTO {
        id
        username
        name
        avatar
        resourceIdentifier {
          id
          type
        }
      }
      ... on CommunityDTO {
        id
        name
        avatar
        resourceIdentifier {
          id
          type
        }
      }
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
  }
`;

export const searchTags = gql`
  query searchTags($page: Int, $size: Int, $query: String) {
    searchTags(page: $page, size: $size, query: $query) {
      totalElements
      totalPages
      content {
        tag
        count
        score
      }
    }
  }
`;
