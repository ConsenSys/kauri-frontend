export const getAllCuratedList = (payload, maxResult, filter) => ({
  query: `
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
          resourceIdentifier {
            id
            type
            version
          }
        }
        ... on CollectionDTO {
          id
          name
          description
          attributes
          background
          resourceIdentifier {
            id
            type
            version
          }
        }
        ... on CommunityDTO {
          id
          name
          resourceIdentifier {
            id
            type
            version
          }
        }
        ... on PublicUserDTO {
          id
          name
          resourceIdentifier {
            id
            type
            version
          }
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
`,
  variables: {},
  operationName: "getAllCuratedList",
});

export const createCuratedList = (payload, maxResult, filter) => ({
  query:
    "mutation createCuratedList($name: String, $description: String, $featured: Boolean, $resources: [ResourceIdentifierInput]) { createCuratedList (name: $name, description: $description, featured: $featured, resources: $resources) {hash}    }",
  variables: payload,
  operationName: "createCuratedList",
});

export const editCuratedList = (payload, maxResult, filter) => ({
  query:
    "mutation createCuratedList($id: String, $name: String, $description: String, $featured: Boolean, $resources: [ResourceIdentifierInput]) { createCuratedList (id: $id, name: $name, description: $description, featured: $featured, resources: $resources) {hash}    }",
  variables: payload,
  operationName: "createCuratedList",
});

export const removeCuratedList = (payload, maxResult, filter) => ({
  query: "mutation removeCuratedList($id: String) { removeCuratedList (id: $id) {hash} }",
  variables: payload,
  operationName: "removeCuratedList",
});

export const addResourceToCuratedList = (payload, maxResult, filter) => ({
  query:
    "mutation addResourceToCuratedList($id: String,  $resource: ResourceIdentifierInput) { addResourceToCuratedList (id: $id, resource: $resource) {hash}    }",
  variables: payload,
  operationName: "addResourceToCuratedList",
});

export const removeResourceFromCuratedList = (payload, maxResult, filter) => ({
  query:
    "mutation removeResourceFromCuratedList($id: String, $resource: ResourceIdentifierInput) { removeResourceFromCuratedList (id: $id, resource: $resource) {hash} }",
  variables: payload,
  operationName: "removeResourceFromCuratedList",
});

export const addHeaderToCuratedList = (payload, maxResult, filter) => ({
  query:
    "mutation addHeaderToCuratedList($id: String, $header: ResourceIdentifierInput) { addHeaderToCuratedList (id: $id, header: $header) {hash}    }",
  variables: payload,
  operationName: "addHeaderToCuratedList",
});
