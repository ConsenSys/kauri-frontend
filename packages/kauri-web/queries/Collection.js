// @flow
import gql from 'graphql-tag'

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
      username
      avatar
    }
    sections {
      name
      description
      resourcesId {
        id
        type
      }
    }
    resourceIdentifier {
      type
      id
    }
  }
`

export const globalCollectionDetails = gql`
  query getCollection($id: String) {
    getCollection(id: $id) {
      id
      name
      description
      background
      dateCreated
      owner {
        id
        name
        username
        avatar
        resourceIdentifier {
          id
          type
        }
      }
      sections {
        name
        description
        resources {
          ... on ArticleDTO {
            authorId
            id
            version
            title
            content
            dateCreated
            datePublished
            owner {
              ... on PublicUserDTO {
                id
                username
                name
                avatar
              }
            }
            status
            attributes
            vote {
              totalVote
            }
          }
        }
      }
      resourceIdentifier {
        type
        id
      }
    }
  }
`

export const getCollection = globalCollectionDetails

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
        ... on ArticleDTO {
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
    createCollection(name: $name, description: $description, background: $background) {
      hash
    }
  }
`

export const editCollection = gql`
  mutation editCollection($id: String, $name: String, $description: String, $background: String) {
    createCollection(id: $id, name: $name, description: $description, background: $background) {
      hash
    }
  }
`

export const composeCollection = gql`
  mutation composeCollection($id: String, $sections: [SectionDTOInput]) {
    composeCollection(id: $id, sections: $sections) {
      hash
    }
  }
`
export const getLatestCollections = gql`
  query searchCollections($size: Int = 12, $page: Int = 0) {
    searchCollections(size: $size, page: $page, sort: "dateUpdated", dir: DESC) {
      content {
        ...Collection
      }
      isLast
    }
  }

  ${Collection}
`

export const searchCollections = gql`
  query searchCollections($filter: CollectionFilterInput) {
    searchCollections(size: 10, filter: $filter) {
      content {
        ...Collection
      }
    }
  }
  ${Collection}
`

export const getCollectionsForUser = gql`
  query searchCollections($filter: CollectionFilterInput, $size: Int = 8, $page: Int = 0) {
    searchCollections(filter: $filter, page: $page, size: $size) {
      totalElements
      content {
        ...Collection
      }
      isLast
    }
  }
  ${Collection}
`
