open Infix_Utilities;

module Styles = {
  let container = Css.(style([]));

  let header =
    Css.(
      style([
        height(px(190)),
        backgroundColor(hex("1E2428")),
        display(`flex),
        alignItems(center),
        justifyContent(spaceBetween),
        unsafe("padding", "0px calc((100vw - 1280px) / 2)"),
        selector("> :last-child", [marginRight(px(136))]),
      ])
    );
  let articlesContainer =
    Css.(
      style([
        display(flexBox),
        flexDirection(row),
        justifyContent(center),
        flex(1),
        flexWrap(wrap),
        unsafe("padding", "2.5em calc((100vw - 1280px) / 2)"),
        paddingBottom(px(0)),
      ])
    );
  let sectionTitle =
    Css.(style([width(`percent(100.0)), textAlign(center)]));
};

let component = ReasonReact.statelessComponent("RinkebyPublicProfile");

let renderArticleCards = (~response, ~routeChangeAction) =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    (
      content
      |> Js.Array.map(article => {
           open Article_Resource;
           let {
             articleId,
             articleVersion,
             key,
             title,
             content,
             date,
             username,
             userId,
           } =
             make(article);
           <ArticleCard
             key
             pageType=ArticleCard.RinkebyPublicProfile
             articleId
             articleVersion
             changeRoute=routeChangeAction
             title
             content
             date
             username
             userId
           />;
         })
    )
    ->ReasonReact.array
  | None => <p> "No articles found boo"->ReasonReact.string </p>
  };

let make = (~userId, ~routeChangeAction, _children) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let articlesQuery = SearchPersonalArticles.make(~userId, ());
    <SearchPersonalArticlesQuery variables=articlesQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <Loading />
             | Error(error) =>
               <div> (ReasonReact.string(error##message)) </div>
             | Data(response) =>
               <div className=Styles.container>
                 <section className=Styles.header>
                   <ProfileAvatar_Connection userId />
                   <StatisticsContainer
                     statistics=[|
                       {
                         "name": "Articles",
                         "count": Article_Resource.articlesCountGet(response),
                       },
                     |]
                   />
                 </section>
                 <section className=Styles.articlesContainer>
                   (renderArticleCards(~response, ~routeChangeAction))
                 </section>
               </div>
             }
         )
    </SearchPersonalArticlesQuery>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  userId: string,
  routeChangeAction: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~userId=jsProps->userIdGet,
      ~routeChangeAction=jsProps->routeChangeActionGet,
      [||],
    )
  );