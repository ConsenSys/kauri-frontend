// @flow
import gql from "graphql-tag";

export const User = gql`
  fragment User on PublicUserDTO {
    id
    name
  }
`;

export const UserOwner = gql`
  fragment UserOwner on PublicUserDTO {
    id
    name
    username
    avatar
    resourceIdentifier {
      id
      type
    }
  }
`;

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

export const getOwnProfile = gql`
  query getMyProfile {
    getMyProfile {
      id
      email
      username
      name
      title
      website
      avatar
      social
      status
      subscriptions
      dateCreated
    }
  }
`;

export const saveUserDetails = gql`
  mutation saveUser(
    $username: String
    $name: String
    $title: String
    $website: String
    $avatar: String
    $email: String
    $social: Map_String_StringScalar
    $subscriptions: Map_String_BooleanScalar
  ) {
    saveUser(
      name: $name
      username: $username
      avatar: $avatar
      title: $title
      website: $website
      social: $social
      email: $email
      subscriptions: $subscriptions
    ) {
      hash
    }
  }
`;

export const regenerateEmailVerificationCode = gql`
  mutation regenerateEmailVerificationCode {
    regenerateEmailVerificationCode {
      hash
    }
  }
`;

export const verifyEmail = gql`
  mutation verifyEmail($code: String) {
    verifyEmail(code: $code) {
      hash
    }
  }
`;
