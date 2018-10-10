//@flow
import gql from 'graphql-tag'

export const HomePageQuery = gql`
query getAllCuratedList {
  getAllCuratedList  {
    id,
    name,
    description,
    featured,
    dateCreated,
    owner {
      id,
      name
    },
    header {
      ...on ArticleDTO { id, version, title, content, dateCreated, datePublished, author { id, name, username },
        owner {
          ...on PublicUserDTO { id, username, name, avatar }
          ...on CommunityDTO {id, name }
        } status, attributes, vote { totalVote } },
      ...on CollectionDTO { id },
      ...on CommunityDTO { id, name },
      ...on PublicUserDTO { id} }
    resources {
      ...on ArticleDTO { id, version, title, content, dateCreated, datePublished, author { id, name, username },
        owner {
          ...on PublicUserDTO { id, username, name, avatar }
          ...on CommunityDTO {id, name }
        } status, attributes, vote { totalVote } },
      ...on CollectionDTO { id },
      ...on CommunityDTO { id, name },
      ...on PublicUserDTO { id }
    }
  }
}
`
