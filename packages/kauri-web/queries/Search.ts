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
