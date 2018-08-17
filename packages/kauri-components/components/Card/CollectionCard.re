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
        height(px(50)),
        paddingLeft(px(14)),
        paddingRight(px(14)),
      ])
    );

  let collectionCardContent = (~imageURL, ~colorProp) =>
    Css.(
      style([
        display(`flex),
        flex(1),
        color(hex(colorProp)),
        backgroundSize(`cover),
        /* unsafe("background", {j|url($imageURL) center center|j}), */
        unsafe(
          "background",
          switch (imageURL) {
          | Some(string) => {j|url($string) center center|j}
          | _ => "transparent"
          },
        ),
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

let cardContent = (~collectionName, ~imageURL, ~collectionDescription) =>
  <>
    <Heading
      text=collectionName
      color=(
        switch (imageURL) {
        | Some(_) => "FFFFFF"
        | None => "1E2428"
        }
      )
    />
    <Paragraph
      color=(
        switch (imageURL) {
        | Some(_) => "FFFFFF"
        | None => "1E2428"
        }
      )
      text=collectionDescription
    />
  </>;

let make =
    (
      ~heading="collection",
      ~collectionName,
      ~collectionDescription,
      ~articles,
      ~lastUpdated=?,
      ~curatorImage=?,
      ~linkComponent=?,
      ~imageURL,
      ~cardHeight=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className=(Styles.collectionCardContainer(~heightProp=cardHeight))>
        <div
          className=(
            Styles.collectionCardContent(
              ~imageURL,
              ~colorProp=
                switch (imageURL) {
                | Some(_) => "FFFFFF"
                | _ => "1E2428"
                },
            )
          )>
          <div className=(Styles.darkLayer(~image=imageURL))>
            <Label
              color=(
                switch (imageURL) {
                | Some(_) => "FFFFFF"
                | None => "1E2428"
                }
              )
              text=heading
            />
            (
              switch (linkComponent) {
              | Some(linkComponent) =>
                linkComponent(
                  cardContent(
                    ~collectionName,
                    ~collectionDescription,
                    ~imageURL,
                  ),
                )
              | None =>
                cardContent(
                  ~collectionName,
                  ~collectionDescription,
                  ~imageURL,
                )
              }
            )
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
              | Some(string) =>
                <Label
                  color=
                    imageURL
                    ->Belt.Option.mapWithDefault("1E2428", (_ => "FFFFFF"))
                  text=string
                />
              | None => ReasonReact.null
              }
            )
          </div>
        </div>
        (
          switch (imageURL) {
          | Some(_) => ReasonReact.null
          | None => <Separator marginX=14 marginY=0 direction="horizontal" />
          }
        )
        <div className=Styles.collectionCardFooter>
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
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  changeRoute: string => unit,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~heading=jsProps->headingGet,
      ~collectionName=jsProps->collectionNameGet,
      ~articles=jsProps->articlesGet,
      ~lastUpdated=jsProps->lastUpdatedGet,
      ~imageURL=jsProps->imageURLGet->Js.Nullable.toOption,
      ~linkComponent=jsProps->linkComponentGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~collectionDescription=jsProps->collectionDescriptionGet,
      [||],
    )
  );