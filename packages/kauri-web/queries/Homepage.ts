import gql from "graphql-tag";
import { UserOwner } from "./User";
import { CommunityOwner } from "./Community";

export const HomePageV2Query = gql`
  fragment ResourceFragment on AbstractResourceDTO {
    ... on CollectionDTO {
      id
      name
      description
      background
      dateCreated
      attributes
      owner {
        ... on PublicUserDTO {
          id
          name
        }
      }
      resourceIdentifier {
        type
        id
      }
    }
    ... on ArticleDTO {
      id
      version
      title
      description
      content
      dateCreated
      datePublished
      authorId
      author {
        id
        name
      }
      ownerId {
        id
        type
      }
      attributes
      contentHash
      checkpoint
      tags
      resourceIdentifier {
        type
        id
        version
      }
    }
    ... on CommunityDTO {
      id
      dateCreated
      dateUpdated
      creatorId
      name
      description
      website
      avatar
      social
      tags
      metadataLocator
      resourceIdentifier {
        type
        id
      }
    }
  }

  fragment UserFragment on PublicUserDTO {
    id
    name
    username
  }

  fragment HomepageComponentFragment on HomepageComponentDTO {
    ... on Categories {
      type
      properties
      content {
        name
        description
        image
        link
      }
    }
    ... on Featured {
      type
      properties
      content {
        resource {
          ...ResourceFragment
        }
      }
    }
    ... on Actions {
      type
      properties
      content {
        name
        link
      }
    }
    ... on TopTags {
      type
      properties
      content {
        name
      }
    }
    ... on TopContributors {
      type
      properties
      content {
        user {
          ...UserFragment
        }
      }
    }
    ... on Promo {
      type
      properties
      content {
        resource {
          ...ResourceFragment
        }
      }
    }
    ... on LatestContent {
      type
      properties
      content {
        ...ResourceFragment
      }
    }
    ... on Newsletter {
      type
      properties
    }
    ... on Import {
      type
      properties
    }
  }

  query HomePagev2($populate: Boolean = true) {
    getLatestHomepageDescriptor(populate: $populate) {
      rows {
        main {
          ...HomepageComponentFragment
        }
        sidebar {
          ...HomepageComponentFragment
        }
      }
    }
  }
`;

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
          description
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
          voteResult {
            sum
          }
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
          description
          dateCreated
          datePublished
          author {
            id
            name
            username
            avatar
          }
          owner {
            ...UserOwner
            ...CommunityOwner
          }

          status
          attributes
          voteResult {
            sum
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
            ...UserOwner
            ...CommunityOwner
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

  ${UserOwner}
  ${CommunityOwner}
`;
