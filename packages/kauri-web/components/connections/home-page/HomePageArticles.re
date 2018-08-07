[@bs.module]
external homepage : ReasonReact.reactClass =
  "../../components/containers/Homepage/View";

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};
let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let (|??) = (a, b) =>
  switch (a) {
  | None => ""
  | Some(a) =>
    switch (b(a)) {
    | Some(a) => a
    | None => ""
    }
  };

let (|???) = (a, b) =>
  switch (a) {
  | None => 0
  | Some(a) =>
    switch (b(a)) {
    | Some(a) => a
    | None => 0
    }
  };

module Styles = {
  let container =
    Css.(
      [%css
        {|
      {
          display: flexBox;
          flex-direction: row;
          justify-content: flex-start;
          padding: 10px;
          flex: 1;
          flex-wrap: wrap;
    }
    |}
      ]
    )
    |> Css.style;

  let sectionTitle =
    Css.([%css {|
  {
      width: 100%;
      text-align: center;
}
|}])
    |> Css.style;
};

module GetCollections = [%graphql
  {|
    query searchArticles {
        searchArticles (filter: { status_in: [PUBLISHED], latest_version: true }) {
            content {
                article_id
                article_version
                subject
                text
                date_updated
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

module GetArticlesQuery = ReasonApollo.CreateQuery(GetCollections);

let component = ReasonReact.statelessComponent("HomePageArticles");

let renderArticleCards = (~response, ~routeChangeAction) =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    content
    |> Js.Array.map(article =>
         <ArticleCard
           articleId=(article |?? (x => x##article_id))
           articleVersion=(article |??? (x => x##article_version))
           changeRoute=routeChangeAction
           key=(article |?? (article => article##article_id))
           title=(article |?? (article => article##subject))
           content=(article |?? (article => article##text))
           date=(
             article
             |? (article => article##date_updated)
             |?? Js.Json.decodeString
             |. MomentRe.moment
             |. MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)))
           )
           username=(
             switch (
               article
               |? (article => article##user)
               |? (user => user##username)
             ) {
             | Some(username) => username
             | None => "Unknown Writer"
             }
           )
         />
       )
    |. ReasonReact.array
  | None => <p> ("No articles found boo" |. ReasonReact.string) </p>
  };

let make = (~routeChangeAction, _children) => {
  ...component,
  render: _self => {
    let articlesQuery = GetCollections.make();
    <GetArticlesQuery variables=articlesQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <div> (ReasonReact.string("Loading")) </div>
             | Error(error) =>
               <div> (ReasonReact.string(error##message)) </div>
             | Data(response) =>
               <div className=Styles.container>
                 <h1 className=Styles.sectionTitle>
                   (ReasonReact.string("Latest Articles"))
                 </h1>
                 (renderArticleCards(~response, ~routeChangeAction))
               </div>
             }
         )
    </GetArticlesQuery>;
  },
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~routeChangeAction=jsProps |. routeChangeActionGet, [||])
  );