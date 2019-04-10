// @flow

export const searchArticles = (payload, maxResult, filter) => ({
    query:
        `query searchArticles($page: Int = 0, $size: Int = 100
            $sort: String = "date_created"
            $dir: DirectionInput = ASC
            $filter: ArticleFilterInput) {
                searchArticles(
                    page: $page
                    size: $size
                    sort: $sort
                    dir: $dir
                filter: $filter) {
                    content {
                        id
                        title
                        version
                        status
                        dateCreated
                    }
                    isLast
                    totalElements
        }
    }`,
    variables: {
        page: payload.page,
        size: maxResult,
        filter: filter,
    },
    operationName: 'searchArticles'
});

export const transferArticle = (payload) => ({
    query:"mutation initiateArticleTransfer($id: String, $recipient: ResourceIdentifierInput) { initiateArticleTransfer (id: $id, recipient: $recipient) {hash} }",
    variables: {
          id: payload.articleID,
          recipient: {"type": "USER", id: payload.recipientID}
    },
    operationName: "initiateArticleTransfer"
  })

export const getArticleTransfers = (payload, maxResult) => ({
    query: `query getArticleTransfers($page: Int, $size: Int, $sort: String, $dir: Direction, $recipient: String) { getArticleTransfers (page: $page, size: $size, sort: $sort dir: $dir, recipient: $recipient) { content { id, article { ...on ArticleDTO {id, version, title, description, content, dateCreated, datePublished, authorId, ownerId {id, type}, status, attributes, contentHash, checkpoint, tags, resourceIdentifier {type, id, version}, voteResult { resourceId {id, type}, count, sum, mean, median, quantity, hasVoted}}}, transferrer { type, id, version }, recipient { type, id, version }} totalPages, totalElements } }`,
    variables: {
        page: 0,
        size: maxResult,
        sort: 'id',
        dir: "DESC",
        recipient: payload.recipient
    },
    "operationName": "getArticleTransfers"
  })

export const cancelArticleTransfer = (payload) => ({
    query:"mutation cancelArticleTransfer($id: String) { cancelArticleTransfer (id: $id) {hash} }",
    variables: {
        id: payload.id
    },
    operationName: "cancelArticleTransfer"
      
})
  