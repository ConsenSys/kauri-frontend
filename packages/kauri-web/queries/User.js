//@flow
import gql from 'graphql-tag'

export const User = gql`
  fragment User on PublicUserDTO {
     id 
     name
  }
`

export const getUserDetails = gql`
  query getUser($userId: String) {
    getUser(id: $userId) {
      id
      username
      name
      title
      website
      avatar
      social
    }
  }
`;


export const saveUserDetails = gql`
  mutation saveUser(
    $username: String,
    $name: String,
    $title: String,
    $website: String,
    $avatar: String,
    $social: Map_String_StringScalar
    ) {
      saveUser (
        name:$name,
        username:$username,
        avatar: $avatar,
        title: $title,
        website: $website,
        social: $social
      ) {
        hash
      }
    }
`;