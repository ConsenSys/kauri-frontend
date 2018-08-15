import gql from 'graphql-tag'

export const createRequest = gql`
  mutation(
    $bounty: Float
    $subject: String
    $text: String
    $category: String
    $dead_line: Date
    $sub_category: String
  ) {
    createRequest(
      bounty: $bounty
      subject: $subject
      text: $text
      category: $category
      dead_line: $dead_line
      sub_category: $sub_category
    ) {
      hash
    }
  }
`

export const globalSearchOpenRequests = gql`
  query globalSearchOpenRequests($size: Int = 500, $filter: RequestFilterInput, $sort: String = "date_created") {
    searchRequests(size: $size, dir: DESC, filter: $filter, sort: $sort) {
      content {
        user_id
        request_id
        date_created
        category
        bounty
        subject
        text
        total_flag
        dead_line
        total_submissions
        is_flagged
        status
        comments {
          date_created
          comment
        }
      }
      totalElements
    }
  }
`

export const searchOpenRequests = gql`
  query searchOpenRequests($size: Int = 500, $userId: String, $category: String, $sort: String = "date_created") {
    searchRequests(
      size: $size
      dir: DESC
      filter: { user_id_eq: $userId, category_in: [$category], status_in: [OPENED] }
      sort: $sort
    ) {
      content {
        user_id
        request_id
        date_created
        category
        sub_category
        bounty
        subject
        text
        total_flag
        dead_line
        total_submissions
        is_flagged
        status
        comments {
          date_created
          comment
        }
      }
      totalElements
    }
  }
`

export const searchCompletedRequests = gql`
  query searchCompletedRequests($size: Int = 500, $filter: RequestFilterInput) {
    searchRequests(size: $size, dir: DESC, filter: $filter) {
      content {
        user_id
        request_id
        date_created
        category
        bounty
        subject
        text
        total_flag
        dead_line
        total_submissions
        is_flagged
        status
        comments {
          date_created
          comment
        }
      }
      totalElements
    }
  }
`

export const getOriginalRequest = gql`
  query getRequest($request_id: String) {
    getRequest(id: $request_id) {
      request_id
      date_created
      bounty
      subject
      dead_line
    }
  }
`

export const searchRequests = gql`
  query searchRequests($size: Int = 500, $filter: RequestFilterInput, $sort: String = "date_created") {
    searchRequests(size: $size, dir: DESC, filter: $filter, sort: $sort) {
      content {
        user_id
        request_id
        content_hash
        date_created
        bounty
        subject
        text
        sub_category
        category
        total_flag
        dead_line
        total_submissions
        is_flagged
        status
        comments {
          date_created
          comment
        }
      }
    }
  }
`

export const getEvent = gql`
  subscription getEvent($hash: String) {
    getEvent(hash: $hash)
  }
`

export const getRequest = gql`
  query getRequest($request_id: String, $size: Int = 500) {
    getRequest(id: $request_id) {
      user_id
      request_id
      date_created
      bounty
      subject
      text
      category
      sub_category
      total_flag
      dead_line
      total_submissions
      is_flagged
      status
      content_hash
      comments {
        date_created
        comment
        user {
          username
        }
      }
      user {
        username
      }
    }

    searchArticles(size: $size, dir: DESC, filter: { request_id_eq: $request_id }) {
      content {
        article_id
        article_version
        status
        text
        subject
        user_id
      }
    }
  }
`

export const getRequestForAnalytics = gql`
  query getRequest($request_id: String) {
    getRequest(id: $request_id) {
      user_id
      request_id
      date_created
      bounty
      subject
      category
      sub_category
      total_flag
      dead_line
      total_submissions
      is_flagged
      status
      content_hash
      user {
        username
      }
    }
  }
`

export const updateRequest = gql`
  mutation updateRequest($request_id: String, $subject: String, $text: String) {
    editRequest(id: $request_id, subject: $subject, text: $text) {
      hash
    }
  }
`

export const flagRequest = gql`
  mutation flagRequest($request_id: String) {
    flagRequest(id: $request_id) {
      hash
    }
  }
`

export const addRequestComment = gql`
  mutation addRequestComment($request_id: String, $comment: String) {
    commentRequest(id: $request_id, comment: $comment) {
      hash
    }
  }
`

export const searchOpenRequestsWithSubmissions = gql`
  query searchOpenRequestsWithSubmissions(
    $size: Int = 500
    $filter: RequestFilterInput
    $sort: String = "dead_line"
    $articleFilter: ArticleFilterInput
  ) {
    searchRequests(size: $size, dir: DESC, filter: $filter, sort: $sort) {
      content {
        user_id
        request_id
        date_created
        subject
        text
        sub_category
        category
        total_flag
        dead_line
        total_submissions
        status
      }
    }

    searchArticles(size: $size, dir: DESC, filter: $articleFilter, sort: "date_created") {
      totalElements
      content {
        article_id
        article_version
        user_id
        request_id
        date_created
        date_updated
        text
        tip
        status
        subject
        sub_category
        category
        content_hash
        comments {
          date_created
        }
        user {
          username
          user_id
        }
      }
    }
  }
`
export const searchExpiredRequests = gql`
  query searchExpiredRequests($size: Int = 500, $userId: String, $currentDate: Date) {
    searchRequests(
      size: $size
      dir: DESC
      filter: { user_id_eq: $userId, dead_line_lt: $currentDate, status_in: [EXPIRED] }
      sort: "dead_line"
    ) {
      content {
        user_id
        request_id
        date_created
        category
        bounty
        subject
        text
        total_flag
        dead_line
        total_submissions
        is_flagged
        status
        comments {
          date_created
          comment
        }
      }
      totalElements
    }
  }
`

export const searchPersonalFlaggedRequests = gql`
  query searchPersonalFlaggedRequests($size: Int = 500, $userId: String) {
    searchRequests(
      size: $size
      dir: DESC
      filter: { user_id_eq: $userId, status_in: [CREATED, OPENED] }
      sort: "dead_line"
    ) {
      content {
        user_id
        request_id
        date_created
        category
        bounty
        subject
        text
        total_flag
        dead_line
        total_submissions
        is_flagged
        status
        comments {
          date_created
          comment
        }
      }
      totalElements
    }
  }
`

export const storeRequestOwnershipSignature = gql`
  mutation storeRequestOwnershipSignature($id: String, $signature: String) {
    storeRequestOwnershipSignature(id: $id, signature: $signature) {
      hash
    }
  }
`
