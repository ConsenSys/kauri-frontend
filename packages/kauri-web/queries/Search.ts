import gql from "graphql-tag";

export const searchAutocomplete = gql`
  query searchAutocomplete(
    $page: Int
    $size: Int
    $query: String
    $filter: SearchFilterInput
  ) {
    searchAutocomplete(
      page: $page
      size: $size
      query: $query
      filter: $filter
    ) {
      totalElements
      totalPages
      totalElementsBreakdown
      content {
        resourceIdentifier {
          id
          type
        }
        tags
        name
        description
        score
      }
    }
  }
`;

export const searchResultsAutocompleteTotalElementsBreakdown = gql`
  query searchAutocomplete(
    $page: Int
    $size: Int
    $query: String
    $filter: SearchFilterInput
  ) {
    searchAutocomplete(
      page: $page
      size: $size
      query: $query
      filter: $filter
    ) {
      totalElements
      totalPages
      totalElementsBreakdown
    }
  }
`;

export const searchResultsAutocomplete = gql`
  query searchResultsAutocomplete(
    $page: Int
    $size: Int
    $query: String
    $filter: SearchFilterInput
  ) {
    searchAutocomplete(
      page: $page
      size: $size
      query: $query
      filter: $filter
    ) {
      totalElements
      totalPages
      totalElementsBreakdown
      content {
        resourceIdentifier {
          id
          type
        }
        resource {
          ... on ArticleDTO {
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
            vote {
              totalVote
            }
            author {
              id
              name
              username
              avatar
            }
          }

          ... on CollectionDTO {
            id
            name
            description
            tags
            background
            dateUpdated
            owner {
              id
              name
              username
              avatar
            }
            resourceIdentifier {
              type
              id
            }
          }
          ... on CommunityDTO {
            id
            dateCreated
            dateUpdated
            creatorId
            name
            description
            website
            avatar
            social
          }
        }
      }
    }
  }
`;
