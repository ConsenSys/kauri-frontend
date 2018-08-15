let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image = Css.(style([width(px(46))]));

  let imageContainer = (~communityColor) =>
    Css.(
      style([
        display(`flex),
        justifyContent(center),
        alignItems(center),
        height(px(80)),
        width(px(80)),
        borderRadius(px(4)),
        unsafe("border", {j|1px solid $communityColor|j}),
      ])
    );

  let container = (~heightProp) =>
    switch (heightProp) {
    | Some(heightProp) =>
      Css.(
        style([
          unsafe("padding", "11px 14px 11px 14px"),
          display(`flex),
          flexDirection(column),
          flex(1),
          textAlign(center),
          minWidth(px(262)),
          maxHeight(px(heightProp)),
        ])
      )
    | None =>
      Css.(
        style([
          unsafe("padding", "11px 14px 11px 14px"),
          display(`flex),
          flexDirection(column),
          flex(1),
          textAlign(center),
          minWidth(px(262)),
        ])
      )
    };

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        justifyContent(center),
        padding2(~v=px(4), ~h=px(14)),
      ])
    );

  let content =
    Css.(
      style([
        display(`flex),
        alignItems(center),
        justifyContent(`flexStart),
        flexDirection(column),
        padding(px(7)),
        flex(1),
      ])
    );
};

let make =
    (
      ~heading="community",
      ~communityName,
      ~communityDescription,
      ~followers,
      ~articles,
      ~views,
      ~communityLogo=?,
      ~communityColor=?,
      ~changeRoute=?,
      ~cardHeight=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        className={Styles.container(~heightProp=cardHeight)}
        onClick={
          _ =>
            switch (changeRoute) {
            | Some(changeRoute) =>
              changeRoute({j|/community/$communityName|j})
            | None => ()
            }
        }>
        <Label text=heading />
        <div className=Styles.content>
          {
            switch (communityLogo) {
            | Some(string) =>
              <div className={Styles.imageContainer(~communityColor)}>
                <img className=Styles.image src=string />
              </div>
            | None => ReasonReact.null
            }
          }
          <Heading text=communityName />
          <Paragraph text=communityDescription />
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.footer>
          <CardCounter value=articles label="Articles" />
        </div>
      </div>
    </BaseCard>,
  /* <CardCounter value=followers label="Followers" />
     <CardCounter value=views label="Views" />
     <CardCounter value=articles label="Articles" /> */
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  communityName: string,
  communityDescription: string,
  followers: string,
  articles: string,
  views: string,
  communityLogo: string,
  changeRoute: string => unit,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps->changeRouteGet,
      ~heading=jsProps->headingGet,
      ~communityName=jsProps->communityNameGet,
      ~communityDescription=jsProps->communityDescriptionGet,
      ~followers=jsProps->followersGet,
      ~articles=jsProps->articlesGet,
      ~views=jsProps->viewsGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~communityLogo=jsProps->communityLogoGet,
      [||],
    )
  );