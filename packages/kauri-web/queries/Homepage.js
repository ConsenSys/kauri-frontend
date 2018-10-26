// @flow
import gql from 'graphql-tag'

// TODO - Sync with backend once CollectionDTO > owner becomes author
export const HomePageQuery = gql`
  query getAllCuratedList {
    getAllCuratedList {
      id
      name
      description
      featured
      dateCreated
      owner {
        id
        name
        username
        avatar
      }
      header {
        ... on ArticleDTO {
          id
          version
          title
          content
          dateCreated
          datePublished
          author {
            id
            name
            username
            avatar
          }

          status
          attributes
          vote {
            totalVote
          }
        }
        ... on CollectionDTO {
          id
        }
        ... on CommunityDTO {
          id
          name
        }
        ... on PublicUserDTO {
          id
        }
      }
      resources {
        ... on ArticleDTO {
          resourceIdentifier {
            type
            id
          }
          id
          version
          title
          content
          dateCreated
          datePublished
          author {
            id
            name
            username
            avatar
          }

          status
          attributes
          vote {
            totalVote
          }
        }
        ... on CollectionDTO {
          id
          name
          description
          background
          dateUpdated
          resourceIdentifier {
            type
            id
          }
          owner {
            id
            username
            name
            avatar
          }
        }
        ... on CommunityDTO {
          id
          name
          resourceIdentifier {
            type
            id
          }
        }
      }
    }
  }
`
