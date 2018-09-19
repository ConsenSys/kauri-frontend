open Infix_Utilities;

[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../lib/theme-config.js"]
external communities: ThemeConfig.communities = "categories";
[@bs.module "../../../routes"]
external linkComponent: Link.linkComponent = "Link";

let component = ReasonReact.statelessComponent("Communities");

module Styles = {
  let container =
    Css.(style([unsafe("padding", "30px calc((100vw - 1280px) / 2)")]));

  let communitiesContainer =
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

let renderCommunitiyCards = {
  open Community_Queries;

  let searchCommunitiesQuery = SearchCommunities.make();

  <SearchCommunitiesQuery variables=searchCommunitiesQuery##variables>
    ...{
         ({result}) =>
           switch (result) {
           | Loading => <Loading />
           | Error(error) =>
             <div> {ReasonReact.string(error##message)} </div>
           | Data(response) =>
             Belt.Array.map(
               response##searchCommunities
               |? (communities => communities##content)
               |> default([||]),
               community => {
                 open Community_Resource;

                 let {key, name, description, avatar, totalArticles} =
                   make(community);

                 <CommunityCard
                   key
                   communityName=name
                   communityDescription=description
                   communityLogo=avatar
                   articles=totalArticles->string_of_int
                   /* followers="1" */
                   /* views="1" */
                   linkComponent=(
                     childrenProps =>
                       <Link
                         useAnchorTag=true
                         linkComponent
                         route={j|/community/$key|j}>
                         ...childrenProps
                       </Link>
                   )
                 />;
               },
             )
             |> ReasonReact.array
           }
       }
  </SearchCommunitiesQuery>;
};

let make = _children => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.communitiesContainer> renderCommunitiyCards </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));