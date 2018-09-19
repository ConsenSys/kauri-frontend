[@bs.module] external gql: ReasonApolloTypes.gql = "graphql-tag";

module GetUser = [%graphql
  {|
  query getUser($userId: String) {
    getUser(id: $userId) {
      id
      name
    }
  }
|}
];

module GetUserQuery = ReasonApollo.CreateQuery(GetUser);

module SaveUser = [%graphql
  {|
    mutation saveUser(
      $username: String,
      $email: String,
      $title: String,
      $website: String,
      $avatar: String,
      $social: Map_String_StringScalar
    ) {
      saveUser (
        username: $username,
        email: $email
        title: $title,
        website: $website,
        avatar: $avatar,
        social: $social
      ) {
        hash
      }
    }
  |}
];

module SaveUserMutation = ReasonApollo.CreateMutation(SaveUser);

module GetMyProfile = [%graphql
  {|
    query getMyProfile {
      getMyProfile {
        id,
        name,
        email,
        title,
        website,
        avatar,
        social
      }
    }
  |}
];

module GetMyProfileQuery = ReasonApollo.CreateQuery(GetMyProfile);

let getMyProfile = GetMyProfileQuery.graphqlQueryAST;