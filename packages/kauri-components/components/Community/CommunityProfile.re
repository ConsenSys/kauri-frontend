let component = ReasonReact.statelessComponent("CommunityAvatar");

module Container =
  Styled.Div({
    type pageType = unit;
    let displayName = "CommunityProfileContainer";

    let style = _ =>
      Css.[
        display(`flex),
        alignItems(center),
        justifyContent(center),
        flexDirection(column),
        selector("> :first-child", [marginBottom(px(10))]),
        selector("> :nth-child(2)", [marginBottom(px(5))]),
        selector("> :nth-child(3)", [marginBottom(px(17))]),
      ];
  });

module CommunityName =
  Styled.H2({
    type pageType = unit;
    let displayName = "CommunityName";

    let style = _ =>
      Css.[
        color(white),
        fontSize(px(20)),
        fontWeight(500),
        margin(`zero),
      ];
  });

module CommunityWebsite =
  Styled.A({
    type pageType = unit;
    let displayName = "CommunityName";

    let style = _ =>
      Css.[
        color(white),
        fontSize(px(12)),
        fontWeight(700),
        textDecoration(`none),
        selector(":hover", [color(hex("0BA986"))]),
      ];
  });

let getCommunity = community =>
  switch (community) {
  | "metamask" => "MetaMask"
  | community => community->String.capitalize
  };

let stripWebsite = website =>
  website |> Js.String.includes("://") ?
    (website |> Js.String.split("://"))[1] : website;

let assembleShareWebsiteURL = (~id, ~hostName) => {
  let hostName = Js.String.replace("api.", "", hostName);
  {j|https://$hostName/community/$id|j};
};

let make = (~id, ~community, ~website, ~avatar, ~hostName, _children) => {
  ...component,
  render: _self =>
    <Container>

        <CommunityAvatar avatar />
        <CommunityName>
          community->getCommunity->ReasonReact.string
        </CommunityName>
        <CommunityWebsite href=website>
          website->stripWebsite->ReasonReact.string
        </CommunityWebsite>
      </Container>,
      /* <ShareArticle
           pageType=CommunityProfile
           url={assembleShareWebsiteURL(~id, ~hostName)}
           title=community->String.capitalize
         /> */
};