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
      user_id
      username
    }
  }
`
