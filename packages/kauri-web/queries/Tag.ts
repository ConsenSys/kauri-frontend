import gql from "graphql-tag";

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
