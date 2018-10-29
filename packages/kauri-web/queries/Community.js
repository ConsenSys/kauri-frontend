// @flow
import gql from 'graphql-tag'

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      id
      dateCreated
      dateUpdated
      creatorId
      name
      description
      status
      website
      avatar
      social
      members {
        id
        name
        role
      }
      approvedId {
        type
      }
      pending {
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
        }
      }
      approved {
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
        }
      }
    }
  }
`

export const getAllCommunities = gql`
  query searchCommunities ($size: Int = 12, $page: Int = 0) {
    searchCommunities (
      size: $size
      page: $page
    ) {
      content {
        id
        dateCreated
        dateUpdated
        creatorId
        name
        description
        status
        website
        avatar
        social
        approvedId {
          type
        }
      }
      isLast
    }
  }
`

export const searchCommunities = gql`
  query searchCommunities($filter: CommunityFilterInput) {
    searchCommunities(size: 10, filter: $filter) {
      content {
        id
        dateCreated
        dateUpdated
        creatorId
        name
        description
        status
        website
        avatar
        social
      }
    }
  }
`
