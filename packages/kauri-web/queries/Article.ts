import gql from "graphql-tag";

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
    tags
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
          id
          type
        }
      }
      ... on CommunityDTO {
        id
        name
        avatar
        resourceIdentifier {
          id
          type
        }
      }
    }
    comments {
      content {
        author {
          id
          name
          username
          avatar
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
`;

export const submitArticle = gql`
  mutation submitArticle(
    $article_id: String
    $text: String
    $subject: String
    $tags: [String]
    $attributes: Map_String_StringScalar
    $version: Int
  ) {
    submitArticle(
      id: $article_id
      content: $text
      title: $subject
      tags: $tags
      attributes: $attributes
      version: $version
    ) {
      hash
    }
  }
`;

export const submitNewArticle = gql`
  mutation submitNewArticle(
    $title: String
    $content: String
    $tags: [String]
    $attributes: Map_String_StringScalar
  ) {
    submitNewArticle(
      title: $title
      content: $content
      tags: $tags
      attributes: $attributes
    ) {
      hash
    }
  }
`;

export const getArticle = gql`
  query getArticle($id: String, $version: Int, $published: Boolean = true) {
    getArticle(id: $id, version: $version, published: $published) {
      ...Article
    }
  }

  ${Article}
`;

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
`;

export const editArticle = gql`
  mutation editArticleVersion(
    $id: String
    $version: Int
    $text: String
    $subject: String
    $tags: [String]
    $attributes: Map_String_StringScalar
  ) {
    editArticleVersion(
      id: $id
      version: $version
      content: $text
      tags: $tags
      title: $subject
      attributes: $attributes
    ) {
      hash
    }
  }
`;

export const searchApprovedArticles = gql`
  query searchApprovedArticles(
    $size: Int = 500
    $text: String
    $category: String
  ) {
    searchArticles(
      size: $size
      dir: DESC
      filter: {
        fullText: $text
        statusIn: [PUBLISHED]
        ownerIdEquals: $category
      }
    ) {
      totalElements
      content {
        ...Article
      }
    }
  }
`;

export const searchPersonalSubmittedArticles = gql`
  query searchPersonalSubmittedArticles($size: Int = 500, $userId: String) {
    searchArticles(
      size: $size
      dir: DESC
      filter: {
        authorIdEquals: $userId
        statusIn: [PUBLISHED]
        latestVersion: true
      }
    ) {
      content {
        ...Article
      }
    }
  }

  ${Article}
`;

export const searchPendingArticles = gql`
  query searchPendingArticles($size: Int = 500, $filter: ArticleFilterInput) {
    searchArticles(size: $size, dir: DESC, filter: $filter) {
      content {
        ...Article
      }
      totalElements
    }
  }
`;

export const getTotalArticlesCount = gql`
  query getTotalArticlesCount($category: String) {
    searchArticles(
      filter: { ownerIdEquals: $category, statusIn: [PUBLISHED] }
    ) {
      totalElements
    }
  }
`;

export const totalArticlesCount = gql`
  query totalArticlesCount($filter: ArticleFilterInput) {
    searchArticles(filter: $filter) {
      totalElements
    }
  }
`;

export const searchPersonalArticles = gql`
  query searchPersonalArticles(
    $userId: String
    $size: Int = 8
    $page: Int = 0
  ) {
    searchArticles(
      size: $size
      page: $page
      sort: "dateCreated"
      dir: DESC
      filter: {
        ownerIdEquals: $userId
        statusIn: [PUBLISHED]
        latestVersion: true
      }
    ) {
      totalElements
      isLast
      content {
        id
        version
        title
        content
        tags
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
`;

export const searchPersonalDrafts = gql`
  query searchArticles($userId: String, $size: Int = 8, $page: Int = 0) {
    searchArticles(
      size: $size
      page: $page
      sort: "dateCreated"
      dir: DESC
      filter: { authorIdEquals: $userId, statusIn: [DRAFT] }
    ) {
      totalElements
      isLast
      content {
        id
        version
        title
        content
        tags
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
`;

export const submitArticleVersion = gql`
  mutation submitArticleVersion(
    $id: String
    $subject: String
    $text: String
    $tags: [String]
    $attributes: Map_String_StringScalar
  ) {
    submitArticleVersion(
      id: $id
      title: $subject
      content: $text
      tags: $tags
      attributes: $attributes
    ) {
      hash
    }
  }
`;

export const addComment = gql`
  mutation addComment($parent: ResourceIdentifierInput, $body: String) {
    addComment(parent: $parent, body: $body) {
      hash
    }
  }
`;

export const searchPending = gql`
  query searchArticles($userId: String, $size: Int = 8, $page: Int = 0) {
    searchArticles(
      size: $size
      page: $page
      sort: "dateCreated"
      dir: DESC
      filter: { ownerIdEquals: $userId, statusIn: [PENDING] }
    ) {
      totalElements
      isLast
      content {
        id
        version
        title
        content
        tags
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
`;

export const searchAwaitingApproval = gql`
  query searchArticles($userId: String, $size: Int = 666, $page: Int = 0) {
    searchArticles(
      size: $size
      page: $page
      sort: "dateCreated"
      dir: DESC
      filter: { authorIdEquals: $userId, statusIn: [PENDING] }
    ) {
      totalElements
      isLast
      content {
        id
        version
        title
        content
        tags
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
`;

export const approveArticle = gql`
  mutation approveArticle($id: String, $version: Int, $signature: String) {
    approveArticle(id: $id, version: $version, signature: $signature) {
      hash
    }
  }
`;

export const rejectArticle = gql`
  mutation rejectArticle($id: String, $version: Int, $cause: String) {
    rejectArticle(id: $id, version: $version, cause: $cause) {
      hash
    }
  }
`;

export const checkpointArticles = gql`
  mutation checkpointArticles {
    checkpointArticles {
      hash
    }
  }
`;

export const globalSearchApprovedArticles = gql`
  query searchAutocompleteArticles(
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
          ... on ArticleDTO {
            ...Article
          }
        }
      }
    }
  }
  ${Article}
`;
