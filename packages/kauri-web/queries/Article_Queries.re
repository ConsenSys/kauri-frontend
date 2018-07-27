module GetArticle = [%graphql
  {|
    query getArticle($article_id: String) {
      getArticle(id: $article_id) {
        article_id
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