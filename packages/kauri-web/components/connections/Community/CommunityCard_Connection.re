let component = ReasonReact.statelessComponent("Community");

let make =
    (
      ~communityName,
      ~communityId,
      ~communityDescription,
      /* ~followers, */
      /* ~views, */
      ~articles,
      ~communityLogo,
      ~cardHeight,
      ~linkComponent=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    switch (linkComponent) {
    | Some(link) =>
      <CommunityCard
        communityName
        communityDescription
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
        communityDescription
        articles
        communityLogo
        /* followers */
        cardHeight
        /* views */
      />
    },
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  communityName: string,
  communityDescription: string,
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
      ~communityDescription=jsProps->communityDescriptionGet,
      /* ~followers=jsProps->followersGet, */
      /* ~views=jsProps->viewsGet, */
      ~articles=jsProps->articlesGet,
      ~communityLogo=jsProps->communityLogoGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );