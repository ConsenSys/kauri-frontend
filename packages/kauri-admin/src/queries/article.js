export const searchArticles = (payload, maxResult, filter) => ({
    query:
        'query searchArticles($page: Int = 0, $size: Int = 1, $sort: String = "date_created", $dir: DirectionInput = DESC, $filter: ArticleFilterInput) { searchArticles(page: $page, size: $size, sort: $sort, dir: $dir, filter: $filter) { content { id, title, version } totalElements }}',
    variables: {
        page: 0,
        size: maxResult,
        filter: filter,
    },
    operationName: 'searchArticles'
});