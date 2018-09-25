export const searchRequests = (payload, maxResult, filter) => ({
    query:
        'query searchRequests($page: Int = 1 $size: Int = 1 $sort: String $dir: DirectionInput, $filter: RequestFilterInput) {searchRequests(page: $page size: $size sort: $sort dir: $dir, filter: $filter) { content {bounty, request_id, subject} totalElements  } }',
    variables: {
        page: 0,
        size: maxResult,
        sort: 'date_created',
        dir: 'DESC',
        filter: filter
    },
    operationName: 'searchRequests'
});