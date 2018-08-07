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