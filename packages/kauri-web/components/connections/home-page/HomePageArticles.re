open Infix_Utilities;

[@bs.module]
external homepage: ReasonReact.reactClass =
  "../../components/containers/Homepage/View";

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        justifyContent(flexStart),
        padding(px(10)),
        flex(1),
        flexWrap(wrap),
      ])
    );

  let sectionTitle =
    Css.(style([width(`percent(100.0)), textAlign(center)]));
};

let component = ReasonReact.statelessComponent("HomePageArticles");

let renderArticleCards = (~response, ~routeChangeAction) =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    (
      content
      |> Js.Array.map(article => {
           open Article_Resource;
           let {
             username,
             articleId,
             userId,
             articleVersion,
             key,
             title,
             content,
             date,
           } =
             make(article);
           <ArticleCard
             articleId
             userId
             articleVersion
             changeRoute=routeChangeAction
             key
             title
             content
             date
             username
           />;
         })
    )
    ->ReasonReact.array
  | None => <p> "No articles found boo"->ReasonReact.string </p>
  };

let make = (~routeChangeAction, _children) => {
  ...component,
  render: _self => {
    let articlesQuery = Article_Queries.GetArticles.make();
    <Article_Queries.GetArticlesQuery variables=articlesQuery##variables>
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
    </Article_Queries.GetArticlesQuery>;
  },
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~routeChangeAction=jsProps->routeChangeActionGet, [||])
  );