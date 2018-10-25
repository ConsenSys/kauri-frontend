open Infix_Utilities;

let keyGet = community =>
  community |? (community => community##id) |> default("");

let nameGet = community =>
  community |? (community => community##name) |> default("");

let descriptionGet = community =>
  community |? (community => community##description) |> default("");

let websiteGet = community =>
  community |? (community => community##website) |> default("");

let avatarGet = community =>
  community |? (community => community##avatar) |> default("");

let dateUpdatedGet = community =>
  community
  |? (datePublished => Js.Json.decodeString(datePublished))
  |> default("")
  |> MomentRe.moment
  |> MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)));

let socialGet = community =>
  community
  |? (community => community##social)
  |? (social => Js.Json.decodeObject(Js.Json.parseExn(social)))
  |> Belt.Option.getExn;

let approvedArticlesCountGet = community =>
  community
  |? (community => community##approved)
  |> default([||])
  |> Belt.Array.length;

type communityResource = {
  key: string,
  name: string,
  description: string,
  website: string,
  avatar: string,
  totalArticles: int,
  /* date: string, */
  /* social: Js.Json.t, */
};

let make = community => {
  let (
    key,
    name,
    description,
    website,
    avatar,
    totalArticles,
    /* date, */
    /* , social */
  ) =
    community
    ->(
        keyGet,
        nameGet,
        descriptionGet,
        websiteGet,
        avatarGet,
        approvedArticlesCountGet,
        /* dateUpdatedGet, */
        /* socialGet, */
      );
  {
    key,
    name,
    description,
    website,
    avatar,
    totalArticles,
    /* date, */
    /* , social */
  };
};

/* Extra getters  */

let articlesCountGet = response =>
  response##searchArticles
  |? (x => x##content)
  |> default([||])
  |> Array.length;