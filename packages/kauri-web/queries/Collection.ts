import gql from "graphql-tag";
import { Article } from "./Article";
import { UserOwner } from "./User";
import { CommunityOwner } from "./Community";

export const Collection = gql`
  fragment Collection on CollectionDTO {
    id
    name
    description
    tags
    background
    dateUpdated
    owner {
      ...UserOwner
      ...CommunityOwner
    }
    sections {
      id
      name
      description
      resourcesId {
        id
        type
      }
      resources {
        ... on ArticleDTO {
          id
          version
        }
      }
    }
    resourceIdentifier {
      type
      id
    }
  }

  ${UserOwner}
  ${CommunityOwner}
`;

export const globalCollectionDetails = gql`
  query getCollection($id: String) {
    getCollection(id: $id) {
      id
      name
      description
      tags
      background
      dateCreated
      owner {
        ...UserOwner
        ...CommunityOwner
      }
      sections {
        name
        description
        resources {
          ... on ArticleDTO {
            ...Article
          }
        }
      }
      resourceIdentifier {
        type
        id
      }
    }
  }

  ${Article}
  ${UserOwner}
  ${CommunityOwner}
`;

export const getCollection = globalCollectionDetails;
export const getCollectionForAnalytics = globalCollectionDetails;

export const createCollection = gql`
  mutation createCollection(
    $name: String
    $description: String
    $background: String
    $tags: [String]
  ) {
    createCollection(
      name: $name
      description: $description
      background: $background
      tags: $tags
    ) {
      hash
    }
  }
`;

export const editCollection = gql`
  mutation editCollection(
    $id: String
    $name: String
    $description: String
    $background: String
    $tags: [String]
  ) {
    createCollection(
      id: $id
      name: $name
      description: $description
      tags: $tags
      background: $background
    ) {
      hash
    }
  }
`;

export const composeCollection = gql`
  mutation composeCollection($id: String, $sections: [SectionDTOInput]) {
    composeCollection(id: $id, sections: $sections) {
      hash
    }
  }
`;

export const getLatestCollections = gql`
  query searchAutocompleteCollections(
    $page: Int = 0
    $size: Int = 12
    $query: String
    $filter: SearchFilterInput
  ) {
    searchAutocomplete(
      page: $page
      size: $size
      query: $query
      filter: $filter
    ) {
      totalElements
      totalPages
      content {
        resourceIdentifier {
          id
          type
        }
        resource {
          ... on CollectionDTO {
            id
            name
            description
            tags
            background
            dateUpdated
            owner {
              ...UserOwner
              ...CommunityOwner
            }
            sections {
              id
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
        }
      }
    }
  }

  ${UserOwner}
  ${CommunityOwner}
`;

export const searchCollections = gql`
  query searchCollections($filter: CollectionFilterInput) {
    searchCollections(size: 10, filter: $filter) {
      content {
        ...Collection
      }
    }
  }
  ${Collection}
`;

export const getCollectionsForUser = gql`
  query getCollectionsForUser(
    $filter: CollectionFilterInput
    $size: Int = 8
    $page: Int = 0
  ) {
    searchCollections(filter: $filter, page: $page, size: $size) {
      totalElements
      content {
        ...Collection
      }
      isLast
    }
  }
  ${Collection}
`;
