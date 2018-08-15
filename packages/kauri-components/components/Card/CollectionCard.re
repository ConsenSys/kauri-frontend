let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image =
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginTop(px(6)),
      ])
    );

  let collectionCardContainer = (~heightProp) =>
    switch (heightProp) {
    | Some(heightProp) =>
      Css.(
        style([
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
          display(`flex),
          flexDirection(column),
          flex(1),
          textAlign(center),
          minWidth(px(262)),
        ])
      )
    };

  let collectionCardFooter =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(center),
        justifyContent(center),
        paddingBottom(px(16)),
        paddingTop(px(2)),
        paddingRight(px(14)),
        paddingLeft(px(14)),
      ])
    );

  let collectionCardContent = (~imageURL, ~colorProp) =>
    Css.(
      style([
        display(`flex),
        flex(1),
        color(hex(colorProp)),
        backgroundSize(`cover),
        unsafe("background", {j|url($imageURL) center center|j}),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
        overflow(hidden),
      ])
    );

  let darkLayer = (~image) =>
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        justifyContent(`flexStart),
        alignItems(`center),
        flexDirection(column),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
        flex(1),
        unsafe("padding", "11px 14px 11px 14px"),
        unsafe(
          "background",
          switch (image) {
          | Some(_) => "rgba(0,0,0,0.4)"
          | _ => "transparent"
          },
        ),
      ])
    );
};

let make =
    (
      ~heading="collection",
      ~collectionName,
      ~collectionDescription,
      ~articles,
      ~lastUpdated=?,
      ~curatorImage=?,
      ~changeRoute=?,
      ~collectionId: string,
      ~imageURL,
      ~cardHeight=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        onClick=(
          _ =>
            switch (changeRoute) {
            | Some(changeRoute) =>
              changeRoute({j|/collection/$collectionId|j})
            | None => ()
            }
        )
        className=(Styles.collectionCardContainer(~heightProp=cardHeight))>
        <div
          className=(
            Styles.collectionCardContent(
              ~imageURL=
                switch (imageURL) {
                | Some(url) => url
                | _ => "transparent"
                },
              ~colorProp=
                switch (imageURL) {
                | Some(_) => "FFFFFF"
                | _ => "1E2428"
                },
            )
          )>
          <div className=(Styles.darkLayer(~image=imageURL))>
            <Label text=heading />
            <Heading
              text=collectionName
              color=(
                switch (imageURL) {
                | Some(_) => "FFFFFF"
                | None => "1E2428"
                }
              )
            />
            <Paragraph text=collectionDescription />
            <img
              className=Styles.image
              src=(
                switch (curatorImage) {
                | Some(image) => image
                | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
                }
              )
            />
            (
              switch (lastUpdated) {
              | Some(string) => <Label text=string />
              | None => ReasonReact.null
              }
            )
          </div>
        </div>
        <div className=Styles.collectionCardFooter>
          <Separator marginTop=0 direction="horizontal" />
          <CardCounter value=articles label="Articles" />
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  collectionName: string,
  collectionDescription: string,
  collectionId: string,
  articles: string,
  lastUpdated: string,
  imageURL: Js.Nullable.t(string),
  changeRoute: string => unit,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps->changeRouteGet,
      ~heading=jsProps->headingGet,
      ~collectionName=jsProps->collectionNameGet,
      ~articles=jsProps->articlesGet,
      ~lastUpdated=jsProps->lastUpdatedGet,
      ~collectionId=jsProps->collectionIdGet,
      ~imageURL=jsProps->imageURLGet->Js.Nullable.toOption,
      ~cardHeight=jsProps->cardHeightGet,
      ~collectionDescription=jsProps->collectionDescriptionGet,
      [||],
    )
  );