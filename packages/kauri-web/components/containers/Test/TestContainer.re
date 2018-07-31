let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let component = ReasonReact.statelessComponent("Test");

module Styles = {
  let container =
    Css.(
      [%css
        {|
        {
          display: flex-box;
          background-color: lightgray;
      }
      |}
      ]
    )
    |> Css.style;
};

let renderPublishedArticles = searchArticles =>
  switch (searchArticles |? (searchArticles => searchArticles##content)) {
  | Some(articles) => Js.log(articles)
  | None => Js.log("No articles found boo")
  };

let make = _children => {
  ...component,
  render: _self =>
    Article_Queries.(
      Vrroom.(
        <div className=Styles.container>
          <SearchPublishedArticlesQuery>
            ...(
                 ({result}) =>
                   switch (result) {
                   | Loading => <div> (ReasonReact.string("Loading")) </div>
                   | Error(error) =>
                     <div> (ReasonReact.string(error##message)) </div>
                   | Data(response) =>
                     renderPublishedArticles(response##searchArticles);
                     <div> (ReasonReact.string("Data found")) </div>;
                   }
               )
          </SearchPublishedArticlesQuery>
        </div>
      )
    ),
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));