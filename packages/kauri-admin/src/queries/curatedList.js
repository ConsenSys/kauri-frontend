export const getAllCuratedList = (payload, maxResult, filter) => ({
    query: `
    query getAllCuratedList {
        getAllCuratedList {
          id
          name
          description
          featured
          owner {
            id
            name
          }
          header {
            ...on ArticleDTO {id, version, title, content, dateCreated, datePublished, author { id name }, status, attributes, vote { totalVote }, resourceIdentifier {
              id
              type
              version
            } },
            ...on CollectionDTO { id, name, resourceIdentifier {
              id
              type
              version
            }},
            ...on CommunityDTO { id, name, resourceIdentifier {
              id
              type
              version
            } },
            ...on UserDTO { id, name, resourceIdentifier {
              id
              type
              version
            }}
          }
          resources {
            ... on ArticleDTO {
              id
              version
              author {
                id
                name
              }
              dateCreated
              datePublished
              title
              content
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
              dateCreated
              background
              owner {
                id
                name
              }
              resourceIdentifier {
                id
                type
                version
              }
              sections {
                name
                description
                resources {
                  ...on ArticleDTO {
                    id
                  }
                }
              }
            }
          }
        }
      }
`,
    variables: {},
    operationName: "getAllCuratedList"
});

export const createCuratedList = (payload, maxResult, filter) => ({
    query: "mutation createCuratedList($name: String, $description: String, $featured: Boolean, $resources: [ResourceDTOInput]) { createCuratedList (name: $name, description: $description, featured: $featured, resources: $resources) {hash}    }",
    variables: payload,
    operationName: "createCuratedList"
});

export const editCuratedList = (payload, maxResult, filter) => ({
    query: "mutation createCuratedList($id: String, $name: String, $description: String, $featured: Boolean, $resources: [ResourceDTOInput]) { createCuratedList (id: $id, name: $name, description: $description, featured: $featured, resources: $resources) {hash}    }",
    variables: payload,
    operationName: "createCuratedList"
});

export const removeCuratedList = (payload, maxResult, filter) => ({
    query: "mutation removeCuratedList($id: String) { removeCuratedList (id: $id) {hash} }",
    variables: payload,
    operationName: "removeCuratedList"
});

export const addResourceToCuratedList = (payload, maxResult, filter) => ({
    query: "mutation addResourceToCuratedList($id: String,  $resource: ResourceDTOInput) { addResourceToCuratedList (id: $id, resource: $resource) {hash}    }",
    variables: payload,
    operationName: "addResourceToCuratedList"
});

export const removeResourceFromCuratedList = (payload, maxResult, filter) => ({
    query: "mutation removeResourceFromCuratedList($id: String, $resource: ResourceDTOInput) { removeResourceFromCuratedList (id: $id, resource: $resource) {hash} }",
    variables: payload,
    operationName: "removeResourceFromCuratedList"
});

export const addHeaderToCuratedList = (payload, maxResult, filter) => ({
    query: "mutation addHeaderToCuratedList($id: String, $resource: ResourceDTOInput) { addHeaderToCuratedList (id: $id, resource: $resource) {hash}    }",
    variables: payload,
    operationName: "addHeaderToCuratedList"
});
