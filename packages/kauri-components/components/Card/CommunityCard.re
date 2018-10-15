let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image = Css.(style([width(px(46))]));

  let imageContainer =
    Css.(
      style([
        display(`flex),
        justifyContent(center),
        alignItems(center),
        height(px(80)),
        width(px(80)),
        borderRadius(px(4)),
      ])
    );

  let container = (~cardHeightProp) =>
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        flex(1),
        textAlign(`center),
        minWidth(px(262)),
        maxHeight(px(cardHeightProp)),
        selector(" a", [display(`flex), height(`percent(100.0))]),
      ])
    );

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        justifyContent(center),
        height(px(50)),
        paddingBottom(px(15)),
      ])
    );

  let content =
    Css.(
      style([
        display(`flex),
        alignItems(center),
        justifyContent(`flexStart),
        flexDirection(column),
        unsafe("padding", "11px 14px 11px 14px"),
        flex(1),
        height(`percent(100.0)),
        overflow(hidden),
      ])
    );
};

let cardContent =
    (
      ~heading,
      ~communityDescription,
      ~communityName,
      ~communityLogo,
      ~cardHeight,
    ) =>
  <>
    <div className=Styles.content>
      <Label text=heading />
      {
        switch (communityLogo) {
        | Some(string) =>
          <div className=Styles.imageContainer>
            <img className=Styles.image src=string />
          </div>
        | None => ReasonReact.null
        }
      }
      <Heading cardHeight text=communityName />
      <Paragraph cardHeight text=communityDescription />
    </div>
  </>;

let make =
    (
      ~heading="community",
      ~communityName,
      ~communityDescription,
      /* ~followers, */
      ~articles,
      /* ~views, */
      ~communityLogo=?,
      ~cardHeight=290,
      ~linkComponent=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className={Styles.container(~cardHeightProp=cardHeight)}>
        {
          switch (linkComponent) {
          | Some(linkComponent) =>
            linkComponent(
              cardContent(
                ~heading,
                ~communityDescription,
                ~cardHeight,
                ~communityName,
                ~communityLogo,
              ),
            )
          | None =>
            cardContent(
              ~heading,
              ~communityDescription,
              ~communityName,
              ~cardHeight,
              ~communityLogo,
            )
          }
        }
        <Separator marginX=0 marginY=15 direction="horizontal" />
        <div className=Styles.footer>
          <CardCounter value=articles label="Articles" />
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  communityName: string,
  communityDescription: string,
  /* followers: string, */
  articles: string,
  /* views: string, */
  communityLogo: string,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~heading=jsProps->headingGet,
      ~communityName=jsProps->communityNameGet,
      ~communityDescription=jsProps->communityDescriptionGet,
      /* ~followers=jsProps->followersGet, */
      ~articles=jsProps->articlesGet,
      /* ~views=jsProps->viewsGet, */
      ~cardHeight=jsProps->cardHeightGet,
      ~communityLogo=jsProps->communityLogoGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );