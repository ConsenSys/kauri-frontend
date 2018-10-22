open Infix_Utilities;

[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../routes"]
external linkComponent: Link.linkComponent = "Link";

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
        paddingBottom(px(0)),
        unsafe("padding", "0px calc((100vw - 1280px) / 2)"),
        selector("> div", [margin(px(15))]),
      ])
    );
  let sectionTitle =
    Css.(style([width(`percent(100.0)), textAlign(center)]));
};

let component = ReasonReact.statelessComponent("Community");

let renderArticleCards = (~response) =>
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
             userAvatar,
             userId,
             background,
           } =
             make(article);
           <ArticleCard
             key
             id=articleId
             version=articleVersion
             cardHeight=420
             imageURL={Js.Nullable.toOption(background)}
             linkComponent=(
               (childrenProps, route) =>
                 <Link useAnchorTag=true linkComponent route>
                   ...childrenProps
                 </Link>
             )
             title
             content
             date
             username={Some(username)}
             userAvatar
             userId
           />;
         })
    )
    ->ReasonReact.array
  | None => <p> "No articles found boo"->ReasonReact.string </p>
  };

let make = (~category, ~avatar, ~hostName, ~website, ~name, _children) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let articlesQuery = SearchCommunityArticles.make(~category, ());

    <div className=Styles.container>
      <ScrollToTopOnMount />
      <CommunityHeader>
        <CommunityProfile avatar community=name website hostName />
      </CommunityHeader>
      <SearchCommunityArticlesQuery variables=articlesQuery##variables>
        ...{
             ({result}) =>
               switch (result) {
               | Loading => <Loading />
               | Error(error) =>
                 <div> {ReasonReact.string(error##message)} </div>
               | Data(response) =>
                 <section className=Styles.articlesContainer>
                   {renderArticleCards(~response)}
                 </section>
               }
           }
      </SearchCommunityArticlesQuery>
    </div>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  category: string,
  hostName: string,
  website: string,
  avatar: string,
  name: string,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~category=jsProps->categoryGet,
      ~hostName=jsProps->hostNameGet,
      ~website=jsProps->websiteGet,
      ~avatar=jsProps->avatarGet,
      ~name=jsProps->nameGet,
      [||],
    )
  );