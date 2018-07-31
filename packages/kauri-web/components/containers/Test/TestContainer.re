open Vrroom;

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

let renderPublishedArticles = content =>
  switch (content) {
  | Some(content) =>
    content
    |. Belt.Array.map(article
         /* This switch statement is slightly annoying, may use @bsRecord instead =_= */
         =>
           <Control.IfSome option=(article |? (article => article##subject))>
             ...(subject => <p key=subject> (subject |. text) </p>)
           </Control.IfSome>
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
                   <div>
                     (
                       renderPublishedArticles(
                         response##searchArticles |? (x => x##content),
                       )
                     )
                   </div>
                 }
             )
        </SearchPublishedArticlesQuery>
      </div>
    ),
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));