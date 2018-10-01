//@flow
import gql from 'graphql-tag'

export const User = gql`
  fragment User on UserDTO {
     id 
     name
  }
`

export const getUserDetails = gql`
  query getUser($userId: String) {
    getUser(id: $userId) {
      id
      name
      website
      avatar
      title
    }
  }
`;


export const saveUserDetails = gql`
  mutation saveUser(
    $username: String,
    $email: String,
    $title: String,
    $website: String,
    $avatar: String,
    $social: Map_String_StringScalar
    ) {
      saveUser (
        username:$username,
        email: $email,
        avatar: $avatar,
        title: $title,
        website: $website,
        social: $social
      ) {
        hash
      }
    }
`;