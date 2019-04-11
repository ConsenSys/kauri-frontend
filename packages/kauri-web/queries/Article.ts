import gql from "graphql-tag";
import { UserOwner } from "./User";
import { CommunityOwner } from "./Community";

export const Article = gql`
  fragment Article on ArticleDTO {
    associatedNfts {
      tokenType
      contractAddress
      name
      image
      externalUrl
    }
    resourceIdentifier {
      id
      type
    }
    description
    id
    version
    title
    content
    description
    authorId
    dateCreated
    datePublished
    status
    attributes
    contentHash
    checkpoint
    tags
    voteResult {
      sum
      count
      hasVoted
      quantity
    }
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
    updateComment
  }

  ${UserOwner}
  ${CommunityOwner}
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
      voteResult {
        sum
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
    $sort: String = "dateCreated"
    $page: Int = 0
  ) {
    searchArticles(
      page: $page
      size: $size
      dir: DESC
      sort: $sort
      filter: {
        latestVersion: true
        fullText: $text
        statusIn: [PUBLISHED]
        ownerIdEquals: $category
      }
    ) {
      content {
        ...Article
      }
      isLast
      totalElements
      totalPages
    }
  }

  ${Article}
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
    $text: String
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
        fullText: $text
      }
    ) {
      totalElements
      isLast
      content {
        ...Article
      }
      totalPages
      totalElements
    }
  }
  ${Article}
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
        description
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
          ...UserOwner
          ...CommunityOwner
        }
        status
        attributes
        contentHash
        checkpoint
        voteResult {
          sum
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

  ${UserOwner}
  ${CommunityOwner}
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
      filter: { authorIdEquals: $userId, statusIn: [PENDING] }
    ) {
      totalElements
      isLast
      content {
        id
        version
        title
        description
        tags
        dateCreated
        datePublished
        author {
          id
          name
          username
        }
        owner {
          ...UserOwner
          ...CommunityOwner
        }
        status
        attributes
        contentHash
        checkpoint
        voteResult {
          sum
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

  ${UserOwner}
  ${CommunityOwner}
`;

export const searchAwaitingApproval = gql`
  query searchArticles($userId: String, $size: Int = 666, $page: Int = 0) {
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
        description
        tags
        dateCreated
        datePublished
        author {
          id
          name
          username
        }
        owner {
          ...UserOwner
          ...CommunityOwner
        }
        status
        attributes
        contentHash
        checkpoint
        voteResult {
          sum
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

  ${UserOwner}
  ${CommunityOwner}
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
      dir: "desc"
      sort: "dateUpdated"
    ) {
      totalElements
      totalPages
      isLast
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

export const relatedArticles = gql`
  query relatedArticles(
    $page: Int
    $size: Int
    $resourceId: ResourceIdentifierInput
    $filter: SearchFilterInput
  ) {
    searchMoreLikeThis(
      page: $page
      size: $size
      resourceId: $resourceId
      filter: $filter
    ) {
      totalElements
      totalElementsBreakdown
      totalPages
      content {
        resourceIdentifier {
          id
          type
        }
        tags
        name
        description
        score
      }
    }
  }
`;

export const vote = gql`
  mutation vote($resourceId: ResourceIdentifierInput, $value: Float) {
    vote(resourceId: $resourceId, value: $value) {
      hash
    }
  }
`;

export const getArticleTransfers = gql`
  query getArticleTransfers(
    $page: Int = 0
    $size: Int = 100
    $recipient: String
  ) {
    getArticleTransfers(page: $page, size: $size, recipient: $recipient) {
      content {
        id
        article {
          ... on ArticleDTO {
            ...Article
          }
        }
        transferrer {
          type
          id
          version
        }
        recipient {
          type
          id
          version
        }
      }
      totalPages
      totalElements
    }
  }
  ${Article}
`;

export const rejectArticleTransfer = gql`
  mutation rejectArticleTransfer($id: String) {
    rejectArticleTransfer(id: $id) {
      hash
    }
  }
`;
