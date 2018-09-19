import gql from 'graphql-tag'

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      id dateCreated dateUpdated creatorId name description status website avatar social 
      members {
      id, name, role 
      }
       pending {
      ...on ArticleDTO {
     id, version, title, content, dateCreated, datePublished, author {
      id name }, status, attributes, vote {
      totalVote } }, ...on CollectionDTO {
      id, name} 
    } 
      approved {
      ...on ArticleDTO {
     id, version, title, content, dateCreated, datePublished, author {
      id name }, status, attributes, vote {
      totalVote } }, 
      ...on CollectionDTO {
      id, name
    }
   } 
    }
  }
`
