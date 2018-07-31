open Vrroom;

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let (|??) = (a, b) =>
  switch (a) {
  | None => "" |. text
  | Some(a) =>
    switch (b(a)) {
    | Some(a) => a |. text
    | None => "" |. text
    }
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

let renderPublishedArticles = response =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    content
    |> Js.Array.map(article =>
         <p> (article |?? (article => article##subject)) </p>
       )
    |. ReasonReact.array
  | None => <p> ("No articles found boo" |. text) </p>
  };

let make = _children => {
  ...component,
  render: _self =>
    Article_Queries.(
      <div className=Styles.container>
        <SearchPublishedArticlesQuery>
          ...(
               ({result}) =>
                 switch (result) {
                 | Loading => <div> (ReasonReact.string("Loading")) </div>
                 | Error(error) =>
                   <div> (ReasonReact.string(error##message)) </div>
                 | Data(response) =>
                   <div> (renderPublishedArticles(response)) </div>
                 }
             )
        </SearchPublishedArticlesQuery>
      </div>
    ),
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));