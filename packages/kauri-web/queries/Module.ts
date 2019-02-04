import gql from "graphql-tag";

export const getEvent = gql`
  subscription getEvent($hash: String) {
    getEvent(hash: $hash)
  }
`;
