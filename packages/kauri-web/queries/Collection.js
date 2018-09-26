import gql from 'graphql-tag'
import { Article } from './Article'

export const Collection = gql`
  fragment Collection on CollectionDTO {
    id
    name
    description
    background
    dateCreated
    owner {
      id
      name
    } 
    sections {
      name 
      description 
      resources {
       ...Article
      }
    } 
    resourceIdentifier {
      type
      id
    }
  }

  ${Article}
`

export const globalCollectionDetails = gql`
  query getCollection($id: String) { 
    getCollection(id: $id) {
       id name description background dateCreated owner {
       id name } sections {
       name description resources {
       ...on ArticleDTO {
         authorId
      id, version, title, content, dateCreated, datePublished, author {
       id name }, status, attributes, vote {
       totalVote } } } }, resourceIdentifier {
      type, id} } 
  }
`

export const getCollectionForAnalytics = gql`
  query getCollectionForAnalytics($id: String) {
    getCollection(id: $id) {
      id
      name
      dateCreated
      description
      owner {
        id
        name
      }
      sections {
        name
        description
        ...on ArticleDTO {
          id
          title
          version
          authorId
          author {
            id
            name
          }
          datePublished
          status
        }
      }
      resourceIdentifier {
        type
        id
      }
    }
  }
`

export const GetLatestCollections = gql`
  query searchCollections {
    searchCollections (size: 100) {
        content {
          ...Collection
        }
    }
  }

  ${Collection}
`;

export const searchCollections = gql`
  query searchCollections ($filter: CollectionFilterInput) {
    searchCollections (size: 10, filter: $filter) {
        content {
          ...Collection
        }
    }
  }

  ${Collection}
`;