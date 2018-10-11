// @flow
import gql from 'graphql-tag'

export const Article = gql`
  fragment Article on ArticleDTO {
    id
    version
    title
    content
    authorId
    dateCreated
    datePublished
    status
    attributes
    contentHash
    checkpoint
    vote {
      totalVote
    }
    author {
      id
      name
      username
      avatar
    }
    owner {
      ... on PublicUserDTO {
        id
        username
        name
        avatar
        resourceIdentifier {
          type
        }
      }
      ... on CommunityDTO {
        id
        name
        avatar
        resourceIdentifier {
          type
        }
      }
    }
    comments {
      content {
        author {
          id
          name
        }
        posted
        body
      }
      totalPages
      totalElements
    }
    resourceIdentifier {
      id
      type
      version
    }
  }
`

export const submitArticle = gql`
  mutation submitArticle(
    $article_id: String
    $text: String
    $subject: String
    $attributes: Map_String_StringScalar
    $version: Int
  ) {
    submitArticle(id: $article_id, content: $text, title: $subject, attributes: $attributes, version: $version) {
      hash
    }
  }
`

export const submitNewArticle = gql`
  mutation submitNewArticle($title: String, $content: String, $attributes: Map_String_StringScalar) {
    submitNewArticle(title: $title, content: $content, attributes: $attributes) {
      hash
    }
  }
`

export const commentArticle = gql`
  mutation commentArticle(
    $comment: String
    $highlight_from: Int
    $highlight_to: Int
    $article_id: String
    $article_version: Int
    $anchor_key: String
    $focus_key: String
  ) {
    commentArticle(
      comment: $comment
      highlight_from: $highlight_from
      highlight_to: $highlight_to
      id: $article_id
      version: $article_version
      anchor_key: $anchor_key
      focus_key: $focus_key
    ) {
      hash
    }
  }
`

export const getArticle = gql`
  query getArticle($id: String, $version: Int, $published: Boolean = true) {
    getArticle(id: $id, version: $version, published: $published) {
      ...Article
    }
  }

  ${Article}
`

export const getArticleForAnalytics = gql`
  query getArticle($id: String, $version: Int, $published: Boolean = false) {
    getArticle(id: $id, version: $version, published: $published) {
      id
      version
      title
      dateCreated
      datePublished
      status
      attributes
      contentHash
      checkpoint
      vote {
        totalVote
      }
      author {
        id
        name
      }
      resourceIdentifier {
        id
        type
        version
      }
    }
  }
`

export const editArticle = gql`
  mutation editArticleVersion(
    $id: String
    $version: Int
    $text: String
    $subject: String
    $attributes: Map_String_StringScalar
  ) {
    editArticleVersion(id: $id, version: $version, content: $text, title: $subject, attributes: $attributes) {
      hash
    }
  }
`

export const searchApprovedArticles = gql`
  query searchApprovedArticles($size: Int = 500, $text: String, $category: String) {
    searchArticles(
      size: $size
      dir: DESC
      filter: { fullText: $text, statusIn: [PUBLISHED], ownerIdEquals: $category }
    ) {
      totalElements
      content {
        ...Article
      }
    }
  }
`

export const globalSearchApprovedCategoryArticles = gql`
  query globalSearchApprovedArticles($size: Int = 500, $category: String) {
    searchArticles(size: $size, dir: DESC, filter: { ownerIdEquals: $category, statusIn: [PUBLISHED] }) {
      totalElements
      content {
        ...Article
      }
    }
  }
`

export const globalSearchApprovedArticles = gql`
  query globalSearchApprovedArticles($size: Int = 500, $text: String) {
    searchArticles(
      size: $size
      sort: "dateCreated"
      dir: DESC
      filter: { fullText: $text, statusIn: [PUBLISHED], latestVersion: true }
    ) {
      content {
        ...Article
      }
    }
  }

  ${Article}
`

export const searchPersonalSubmittedArticles = gql`
  query searchPersonalSubmittedArticles($size: Int = 500, $userId: String) {
    searchArticles(
      size: $size
      dir: DESC
      filter: { authorIdEquals: $userId, statusIn: [PUBLISHED], latestVersion: true }
    ) {
      content {
        ...Article
      }
    }
  }

  ${Article}
`

export const searchPendingArticles = gql`
  query searchPendingArticles($size: Int = 500, $filter: ArticleFilterInput) {
    searchArticles(size: $size, dir: DESC, filter: $filter) {
      content {
        ...Article
      }
      totalElements
    }
  }
`

export const getTotalArticlesCount = gql`
  query getTotalArticlesCount($category: String) {
    searchArticles(filter: { ownerIdEquals: $category, statusIn: [PUBLISHED] }) {
      totalElements
    }
  }
`

export const totalArticlesCount = gql`
  query totalArticlesCount($filter: ArticleFilterInput) {
    searchArticles(filter: $filter) {
      totalElements
    }
  }
`

// TODO: Rewrite approvals
export const searchPublishedArticleHistory = gql`
  query searchPublishedArticleHistory($userId: String, $categories: [String]) {
    searchArticles(filter: { category_in: $categories, status_in: [PUBLISHED], moderator_eq: $userId }) {
      content {
        ...Article
      }
      totalElements
    }
  }
`

export const storeArticleOwnershipSignature = gql`
  mutation storeArticleOwnershipSignature($id: String, $signature: String) {
    storeArticleOwnershipSignature(id: $id, signature: $signature) {
      hash
    }
  }
`

export const storeArticleValidationSignature = gql`
  mutation storeArticleValidationSignature($id: String, $signature: String) {
    storeArticleValidationSignature(id: $id, signature: $signature) {
      hash
    }
  }
`

export const deleteArticleComment = gql`
  mutation deleteArticleComment($article_id: String, $comment_id: Int) {
    deleteArticleComment(id: $article_id, comment_id: $comment_id) {
      hash
    }
  }
`

export const searchPersonalArticles = gql`
  query searchPersonalArticles($userId: String) {
    searchArticles(
      sort: "dateCreated"
      dir: DESC
      filter: { ownerIdEquals: $userId, statusIn: [PUBLISHED], latestVersion: true }
    ) {
      content {
        id
        version
        title
        content
        dateCreated
        datePublished
        author {
          id
          name
        }
        owner {
          ... on PublicUserDTO {
            id
            username
            name
            avatar
          }
          ... on CommunityDTO {
            id
            name
          }
        }
        status
        attributes
        contentHash
        checkpoint
        vote {
          totalVote
        }
        comments {
          content {
            posted
            author {
              id
              name
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
      totalPages
      totalElements
    }
  }
`

export const searchPersonalDrafts = gql`
  query searchArticles($userId: String) {
    searchArticles(sort: "dateCreated", dir: DESC, filter: { authorIdEquals: $userId, statusIn: [DRAFT] }) {
      content {
        id
        version
        title
        content
        dateCreated
        datePublished
        author {
          id
          username
          name
          avatar
        }
        owner {
          ... on PublicUserDTO {
            id
            username
            name
            avatar
          }
          ... on CommunityDTO {
            id
            name
            avatar
          }
        }
        status
        attributes
        contentHash
        checkpoint
        vote {
          totalVote
        }
        comments {
          content {
            posted
            author {
              id
              name
              username
              avatar
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
    }
  }
`

export const submitArticleVersion = gql`
  mutation submitArticleVersion($id: String, $subject: String, $text: String, $attributes: Map_String_StringScalar) {
    submitArticleVersion(id: $id, title: $subject, content: $text, attributes: $attributes) {
      hash
    }
  }
`

export const addComment = gql`
  mutation addComment($parent: ResourceIdentifierInput, $body: String) {
    addComment(parent: $parent, body: $body) {
      hash
    }
  }
<<<<<<< HEAD
`
=======
`;
>>>>>>> Implement CheckpointArticles without designs lol

export const searchPending = gql`
  query searchArticles($userId: String) {
    searchArticles(sort: "dateCreated", dir: DESC, filter: { ownerIdEquals: $userId, statusIn: [PENDING] }) {
      content {
        id
        version
        title
        content
        dateCreated
        datePublished
        author {
          id
          name
          username
        }
        owner {
          ... on PublicUserDTO {
            id
            username
            name
            avatar
          }
          ... on CommunityDTO {
            id
            name
          }
        }
        status
        attributes
        contentHash
        checkpoint
        vote {
          totalVote
        }
        comments {
          content {
            posted
            author {
              id
              name
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
    }
  }
<<<<<<< HEAD
`
=======
`;
>>>>>>> Implement CheckpointArticles without designs lol

export const searchAwaitingApproval = gql`
  query searchArticles($userId: String) {
    searchArticles(sort: "dateCreated", dir: DESC, filter: { authorIdEquals: $userId, statusIn: [PENDING] }) {
      content {
        id
        version
        title
        content
        dateCreated
        datePublished
        author {
          id
          name
          username
        }
        owner {
          ... on PublicUserDTO {
            id
            username
            name
            avatar
          }
          ... on CommunityDTO {
            id
            name
          }
        }
        status
        attributes
        contentHash
        checkpoint
        vote {
          totalVote
        }
        comments {
          content {
            posted
            author {
              id
              name
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
    }
  }
`

export const approveArticle = gql`
  mutation approveArticle($id: String, $version: Int, $signature: String) {
    approveArticle(id: $id, version: $version, signature: $signature) {
      hash
    }
  }
`

export const rejectArticle = gql`
  mutation rejectArticle($id: String, $version: Int, $cause: String) {
    rejectArticle(id: $id, version: $version, cause: $cause) {
      hash
    }
  }
}`;

export const checkpointArticles = gql`
  mutation checkpointArticles { 
    checkpointArticles { 
      hash 
    } 
  }
`
