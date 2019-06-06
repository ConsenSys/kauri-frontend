import gql from "graphql-tag";

export const recordView = gql`
  mutation recordView($resourceId: ResourceIdentifierInput) {
    recordView(resourceId: $resourceId) {
      hash
    }
  }
`;
