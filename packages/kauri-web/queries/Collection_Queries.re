module GetCollections = [%graphql
  {|
  query searchCollections ($size: Int, $dir: DirectionInput, $sort: String) {
      searchCollections (size: $size, dir: $dir, sort: $sort) {
          content {
              id
              name
              description
              date_created
              owner_id
              sections {
                  name
                  description
                  article_id
                  articles {
                      article_id,
                      subject,
                      article_version
                  }
              }
          }
          totalPages
          totalElements
      }
  }
|}
];

module GetCollectionQuery = ReasonApollo.CreateQuery(GetCollections);