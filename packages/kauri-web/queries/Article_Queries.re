module GetArticle = [%graphql
  {|
    query getArticle($article_id: String!, $article_version: Int!) {
      getArticle(id: $article_id, article_version: $article_version) {
        article_id
        article_version
        user_id
        request_id
        date_created
        date_updated
        text
        tip
        status
        signature
        subject
        sub_category
        category
        content_hash
        comments {
          comment_id
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
          user {
            username
          }
        }
        user {
          user_id
          username
        }
        metadata
      }
    }
  |}
];

module GetArticleQuery = ReasonApollo.CreateQuery(GetArticle);

module ApproveArticle = [%graphql
  {|
    mutation approveArticle($article_id: String!, $article_version: Int!, $signature: String!) {
      approveArticle(id: $article_id, article_version: $article_version, signature: $signature) {
         hash
      }
    }
  |}
];

module ApproveArticleMutation = ReasonApollo.CreateMutation(ApproveArticle);

module DraftArticle = [%graphql
  {|
    mutation submitArticle(
      $id: String
      $subject: String!
      $text: String!
      $category: String
      $sub_category: String
      $metadata: Map_String_StringScalar!
      $draft: Boolean!
      $request_id: String
    ) {
      submitArticle(
        id: $id
        subject: $subject
        text: $text
        category: $category
        sub_category: $sub_category
        metadata: $metadata
        draft: $draft
        request_id: $request_id
      ) {
        hash
      }
    }
  |}
];

module DraftArticleMutation = ReasonApollo.CreateMutation(DraftArticle);

module SubmitForReview = [%graphql
  {|
      mutation submitForReview(
        $id: String,
        $article_version: Int
      ) {
          submitForReview(
            id: $id,
            article_version: $article_version
          ) {
            hash
          }
      }
    |}
];

module SubmitForReviewMutation = ReasonApollo.CreateMutation(SubmitForReview);

module SearchPersonalArticles = [%graphql
  {|
    query searchPersonalArticles($userId: String) {
      searchArticles(filter: { user_id_eq: $userId }) {
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
          signature
          subject
          sub_category
          category
          content_hash
          comments {
            comment_id
            date_created
            comment
            highlight_from
            highlight_to
            anchor_key
            focus_key
            user {
              username
            }
          }
          user {
            user_id
            username
          }
          metadata
        }
      }
    }
  |}
];

module SearchPersonalArticlesQuery =
  ReasonApollo.CreateQuery(SearchPersonalArticles);

module GetUser = [%graphql
  {|
  query getUser($userId: String) {
    getUser(id:$userId) {
      user_id
      username
    }
  }
|}
];

module GetUserQuery = ReasonApollo.CreateQuery(GetUser);

module GetArticles = [%graphql
  {|
    query searchArticles {
        searchArticles (filter: { status_in: [PUBLISHED], latest_version: true }) {
            content {
                article_id
                article_version
                subject
                text
                date_updated
                user_id
                user {
                  user_id
                  username
                }
            }
            totalPages
            totalElements
        }
    }
|}
];

module GetArticlesQuery = ReasonApollo.CreateQuery(GetArticles);

module SearchCommunityArticles = [%graphql
  {|
    query searchCommunityArticles($category: String, $sub_category: String) {
        searchArticles (filter: { status_in: [PUBLISHED], latest_version: true, category_in: [$category], sub_category_in:[$sub_category] }) {
            content {
                article_id
                article_version
                subject
                text
                date_updated
                user_id
                user {
                  user_id
                  username
                }
            }
            totalPages
            totalElements
        }
    }
  |}
];

module SearchCommunityArticlesQuery =
  ReasonApollo.CreateQuery(SearchCommunityArticles);

module CommunityArticlesCount = [%graphql
  {|
    query communityArticlesCount($category: String) {
        searchArticles (filter: { status_in: [PUBLISHED], latest_version: true, category_in: [$category] }) {
            content {
              article_id
            }
            totalElements
        }
    }
  |}
];

module CommunityArticlesCountQuery =
  ReasonApollo.CreateQuery(CommunityArticlesCount);