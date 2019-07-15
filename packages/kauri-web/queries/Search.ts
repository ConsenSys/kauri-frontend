import gql from "graphql-tag";
import { UserOwner,CommunityOwner } from "./Fragments";

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
            }
            owner {
              ...UserOwner
              ...CommunityOwner
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
              ...UserOwner
              ...CommunityOwner
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

  ${UserOwner}
  ${CommunityOwner}
`;
