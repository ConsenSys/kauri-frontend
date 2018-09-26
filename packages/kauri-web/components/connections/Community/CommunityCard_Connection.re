[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../lib/theme-config.js"]
external communities: ThemeConfig.communities = "categories";
let component = ReasonReact.statelessComponent("Community");

let make =
    (
      ~communityName,
      ~communityId,
      /* ~followers, */
      /* ~views, */
      ~communityLogo,
      ~cardHeight,
      ~linkComponent=?,
      _children,
    ) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let articlesCountQuery =
      CommunityArticlesCount.make(~category=communityName, ());
    <CommunityArticlesCountQuery variables=articlesCountQuery##variables>
      ...{
           ({result}) =>
             switch (result) {
             | Loading => <Loading />
             | Error(error) =>
               <div> {ReasonReact.string(error##message)} </div>
             | Data(response) =>
               let articles =
                 response->Article_Resource.articlesCountGet |> string_of_int;
               let description =
                 ThemeConfig.getCommunityConfig(themeConfig, communityId)
                 ->ThemeConfig.(descriptionGet);
               switch (linkComponent) {
               | Some(link) =>
                 <CommunityCard
                   communityName
                   communityDescription=description
                   articles
                   communityLogo
                   cardHeight
                   /* followers */
                   /* views */
                   linkComponent=link
                 />
               | None =>
                 <CommunityCard
                   communityName
                   communityDescription=description
                   articles
                   communityLogo
                   /* followers */
                   cardHeight
                   /* views */
                 />
               };
             }
         }
    </CommunityArticlesCountQuery>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  communityName: string,
  communityId: string,
  followers: string,
  articles: string,
  views: string,
  communityLogo: string,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~communityName=jsProps->communityNameGet,
      ~communityId=jsProps->communityIdGet,
      /* ~followers=jsProps->followersGet, */
      /* ~views=jsProps->viewsGet, */
      ~communityLogo=jsProps->communityLogoGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );