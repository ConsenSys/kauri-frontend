open Infix_Utilities;

/* TODO: Probs a good use for redux or the new react context provider */
[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";

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
      ])
    );
  let sectionTitle =
    Css.(style([width(`percent(100.0)), textAlign(center)]));
};

let component = ReasonReact.statelessComponent("Community");

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

let make = (~routeChangeAction, ~category, _children) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let tabNames = [|"all", "general", "tutorial"|];

    <div className=Styles.container>
      <CommunityHeader>
        <CommunityProfile
          community=category
          website=
            themeConfig
            ->ThemeConfig.getCommunityConfig(category)
            ->ThemeConfig.homepageURLGet
        />
      </CommunityHeader>
      BasicTabs.(
        <Tabs
          defaultTabName=(tabNames[0])
          tabs=(
            (setCurrentTabName, currentTabName) => {
              let articlesCountQuery =
                switch (currentTabName) {
                | "all" => CommunityArticlesCount.make(~category, ())
                | _ => CommunityArticlesCount.make(~category, ())
                };

              <TabList>
                <Tab setCurrentTabName currentTabName name=(tabNames[0])>
                  "All"->String.uppercase->ReasonReact.string
                </Tab>
                <Tab setCurrentTabName currentTabName name=(tabNames[1])>
                  "General Articles"->String.uppercase->ReasonReact.string
                </Tab>
                <Tab setCurrentTabName currentTabName name=(tabNames[2])>
                  "Tutorials"->String.uppercase->ReasonReact.string
                </Tab>
                <PullRight>
                  <Badge>
                    <CommunityArticlesCountQuery
                      variables=articlesCountQuery##variables>
                      ...(
                           ({result}) =>
                             switch (result) {
                             | Loading => <Loading />
                             | Error(error) =>
                               <div>
                                 (ReasonReact.string(error##message))
                               </div>
                             | Data(response) =>
                               let totalArticles =
                                 response
                                 ->Article_Resource.articlesCountGet
                                 ->string_of_int;
                               (totalArticles ++ " Total Articles")
                               ->String.uppercase
                               ->ReasonReact.string;
                             }
                         )
                    </CommunityArticlesCountQuery>
                  </Badge>
                </PullRight>
              </TabList>;
            }
          )
          content=(
            currentTabName => {
              let articlesQuery =
                switch (currentTabName) {
                | "all" => SearchCommunityArticles.make(~category, ())
                | _ =>
                  SearchCommunityArticles.make(
                    ~category,
                    ~sub_category=currentTabName,
                    (),
                  )
                };

              <PanelList>
                (
                  tabNames
                  ->Belt.Array.map(
                      name =>
                        <Panel key=name name currentTabName>
                          <SearchCommunityArticlesQuery
                            variables=articlesQuery##variables>
                            ...(
                                 ({result}) =>
                                   switch (result) {
                                   | Loading => <Loading />
                                   | Error(error) =>
                                     <div>
                                       (ReasonReact.string(error##message))
                                     </div>
                                   | Data(response) =>
                                     <section
                                       className=Styles.articlesContainer>
                                       (
                                         renderArticleCards(
                                           ~response,
                                           ~routeChangeAction,
                                         )
                                       )
                                     </section>
                                   }
                               )
                          </SearchCommunityArticlesQuery>
                        </Panel>,
                    )
                  |> ReasonReact.array
                )
              </PanelList>;
            }
          )
        />
      )
    </div>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  userId: string,
  category: string,
  routeChangeAction: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~routeChangeAction=jsProps->routeChangeActionGet,
      ~category=jsProps->categoryGet,
      [||],
    )
  );