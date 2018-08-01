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
                subject
                text
                date_created
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

let renderArticleCards = response =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    content
    |> Js.Array.map(article =>
         <ArticleCard
           key=(article |?? (article => article##article_id))
           title=(article |?? (article => article##subject))
           content=(article |?? (article => article##text))
           views="10"
           upvotes="10"
           date="3 days agon"
           username="kauri"
         />
       )
    |. ReasonReact.array
  | None => <p> ("No articles found boo" |. ReasonReact.string) </p>
  };

let make = _children => {
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
                 (renderArticleCards(response))
               </div>
             }
         )
    </GetArticlesQuery>;
  },
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make());