export const searchCollections = (payload, maxResult, filter) => ({
    query: `query searchCollections($page: Int, $size: Int, $filter: CollectionFilterInput) { searchCollections (page: $page, size: $size, filter: $filter) { content { id name background description dateCreated owner {id, name}
        sections {
            name
            description
            resources {
              ...on ArticleDTO {
                id
                title
                content
                version
              }
            }}
    } totalPages totalElements } }`,
    variables: {
        page: 0,
        size: 10,
        sort: `dateCreated`,
        dir: `DESC`,
        filter: {}
    },
    operationName: `searchCollections`
});

export const createCollection = (payload, maxResult, filter) => ({
    query: `mutation createCollection($id: String, $name: String, $description: String, $background: String) { createCollection (id: $id, name: $name, description: $description, background: $background) {hash}    }`,
    variables: payload,
    operationName: `createCollection`
});

export const composeCollection = (payload, maxResult, filter) => ({
    query: `mutation composeCollection($id: String, $sections: [SectionDTOInput]) { composeCollection (id: $id, sections: $sections) {hash}    }`,
    variables: payload,
    operationName: `composeCollection`
})

export const removeCollection = (payload, maxResult, filter) => ({
    query: `mutation removeCollection($id: String) { removeCollection (id: $id) {hash}    }`,
    variables: payload,
    operationName: `removeCollection`
});