module Fragments = [%graphql
  {|
    fragment article on ArticleDTO {
      id
      version
      title
      content
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

    fragment collection on CollectionDTO {
      id
      name
    }
  |}
];

module SearchCommunities = [%graphql
  {|
    query searchCommunities {
      searchCommunities {
        content {
          id dateCreated dateUpdated creatorId name description status website avatar social
          members {
            id, name, role
          }
          pending {
            ...Fragments.Article
          }
          approved {
            ...Fragments.Article
          }
          metadataLocator,
          resourceIdentifier {
            type, id
          }
        }
        totalPages
        totalElements
      }
    }
  |}
];

module SearchCommunitiesQuery = ReasonApollo.CreateQuery(SearchCommunities);

module GetCommunity = [%graphql
  {|
    query getCommunity($id: String) {
      getCommunity(id: $id) {
          id dateCreated dateUpdated creatorId name description status website avatar social
          members {
            id, name, role
          }
          pending {
            ...Fragments.Article
          }
          approved {
            ...Fragments.Article
          }
          metadataLocator,
          resourceIdentifier {
            type, id
          }
        }
    }
  |}
];

module GetCommunityQuery = ReasonApollo.CreateQuery(GetCommunity);