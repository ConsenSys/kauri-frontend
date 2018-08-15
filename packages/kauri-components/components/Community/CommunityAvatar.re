let component = ReasonReact.statelessComponent("CommunityAvatar");

module Container =
  Styled.Div({
    type pageType = unit;
    let displayName = "CommunityAvatarContainer";

    let style = _ =>
      Css.[
        display(`flex),
        height(px(96)),
        width(px(96)),
        justifyContent(center),
        alignItems(center),
        borderRadius(px(4)),
        backgroundColor(white),
      ];
  });

module Logo =
  Styled.Img({
    type pageType = unit;
    let displayName = "CommunityAvatarLogo";

    let style = _ => Css.[height(px(54)), width(px(54))];
  });

let make = (~community, _children) => {
  ...component,
  render: _self =>
    <Container>
      <Logo src={j|/static/images/$community/avatar.png|j} />
    </Container>,
};