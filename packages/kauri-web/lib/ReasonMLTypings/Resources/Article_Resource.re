open Infix_Utilities;

let userIdGet = article =>
  article
  |? (article => article##author)
  |? (author => author##id)
  |> default("");

let usernameGet = article =>
  article
  |? (article => article##author)
  |? (author => author##name)
  |> default(
       article
       |? (article => article##author)
       |? (author => author##id)
       |> default("Unknown Writer")
       |> (
         userId =>
           Js.String.substring(~from=0, ~to_=11, userId)
           ++ "..."
           ++ Js.String.substring(
                ~from=Js.String.length(userId) - 13,
                ~to_=11,
                userId,
              )
       ),
     );

let dateUpdatedGet = article =>
  article
  |? (
    article =>
      switch (article##datePublished) {
      | Some(_) => article##datePublished
      | None => article##dateCreated
      }
  )
  |? (date => Js.Json.decodeString(date))
  |> default("")
  |> MomentRe.moment
  |> MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)));

type articleVersionAndId = {
  articleId: string,
  articleVersion: int,
};

let keyGet = article =>
  switch (
    article |? (article => article##id),
    article |? (article => article##version),
  ) {
  | (Some(articleId), Some(articleVersion)) =>
    articleId ++ string_of_int(articleVersion)
  | (None, Some(articleVersion)) => string_of_int(articleVersion)
  | (Some(articleId), None) => articleId
  | (None, None) => ""
  };
let articleIdGet = article => article |? (x => x##id) |> default("");
let articleVersionGet = article => article |? (x => x##version) |> default(1);

let titleGet = article =>
  article |? (article => article##title) |> default("");

let contentGet = article =>
  article |? (article => article##content) |> default("");

type articleResource = {
  key: string,
  articleId: string,
  articleVersion: int,
  title: string,
  content: string,
  date: string,
  username: string,
  userId: string,
};

let make = article => {
  let (key, articleId, articleVersion, title, content, date, username, userId) =
    article
    ->(
        keyGet,
        articleIdGet,
        articleVersionGet,
        titleGet,
        contentGet,
        dateUpdatedGet,
        usernameGet,
        userIdGet,
      );
  {key, articleId, articleVersion, title, content, date, username, userId};
};

/* Extra getters  */

let articlesCountGet = response =>
  response##searchArticles
  |? (x => x##content)
  |> default([||])
  |> Array.length;