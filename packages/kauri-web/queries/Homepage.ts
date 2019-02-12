import gql from "graphql-tag";

// TODO - Sync with backend once CollectionDTO > owner becomes author
export const HomePageQuery = gql`
  query getAllCuratedList {
    getAllCuratedList {
      id
      name
      description
      featured
      dateCreated
      links {
        label
        url
        type
      }
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
        }
        ... on CollectionDTO {
          id
          name
          description
          attributes
          background
        }
        ... on CommunityDTO {
          id
          name
        }
        ... on PublicUserDTO {
          id
          name
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
          sections {
            name
            description
            resourcesId {
              id
              type
            }
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
`;
