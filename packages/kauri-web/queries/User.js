import gql from 'graphql-tag'

export const User = gql`
  fragment User on UserDTO {
     id 
     name
  }
`

export const getUserForAnalytics = gql`
  query getUser($userId: String) {
    getUser(id: $userId) {
      id
      name
    }
  }
`

export const getUserAvatar = gql`
  query getUser($userId: String) {
    getUser(id: $userId) {
      id
      name
    }
  }
`;
