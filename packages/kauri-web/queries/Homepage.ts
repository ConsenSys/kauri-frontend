import gql from "graphql-tag";
import { Collection } from "./Collection";

export const HomePageV2Query = gql`
  fragment UserOwner on PublicUserDTO {
    id
    name
    username
    avatar
    resourceIdentifier {
      id
      type
    }
  }

  fragment CommunityOwner on CommunityDTO {
    id
    name
    avatar
    resourceIdentifier {
      id
      type
    }
  }

  fragment ResourceFragment on AbstractResourceDTO {
    ... on CollectionDTO {
      ...Collection
    }
    ... on ArticleDTO {
      resourceIdentifier {
        id
        type
      }
      description
      id
      version
      title
      content
      description
      authorId
      dateCreated
      datePublished
      attributes
      contentHash
      checkpoint
      tags
      voteResult {
        sum
        count
        hasVoted
        quantity
      }
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
      resourceIdentifier {
        id
        type
        version
      }
      updateComment
    }
    ... on CommunityDTO {
      id
      dateCreated
      dateUpdated
      creatorId
      creator {
        id
        username
        name
      }
      name
      description
      website
      avatar
      social
      tags
      attributes
      approvedId {
        id
        type
      }
      pendingId {
        id
        type
      }
      approved {
        ... on ArticleDTO {
          id
          version
        }

        ... on CollectionDTO {
          id
        }
      }
    }
  }

  fragment UserFragment on PublicUserDTO {
    id
    username
    avatar
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

  query HomePageV2($populate: Boolean = true) {
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

  ${Collection}
`;
