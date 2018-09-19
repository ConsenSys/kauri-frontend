import gql from 'graphql-tag'
import { Collection } from './Collection'
import { User } from './User'

export const HomePageQuery = gql`
  query getAllCuratedList {
    getAllCuratedList { 
      id 
      name 
      description
      featured
      dateCreated
      header {
        ...Article
        ...Collection
        ...on CommunityDTO {
          id
          name
        }
        ...on UserDTO {
          id
          name
        }
      } 
      resources {
        ...Article
        ...Collection
        ...on CommunityDTO {
          id
          name
        }
        ...User      
      }
    } 
  }

  ${Collection}
  ${User}
`
