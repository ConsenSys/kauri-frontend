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

export const createCollection = gql`
  mutation createCollection($name: String, $description: String, $background: String) {
    createCollection (name: $name, description: $description, background: $background) {
      hash
    }
  }
`

export const composeCollection = gql`
  mutation composeCollection($id: String, $sections: [SectionDTOInput]) {
    composeCollection (id: $id, sections: $sections) {
      hash
    }
  }
`
