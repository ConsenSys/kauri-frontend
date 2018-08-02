let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image =
    Css.(
      [%css
        {|
      {
        height: 30px;
        width: 30px;
        border-radius: 15px;
        margin-top: 6px;
    }
    |}
      ]
    )
    |> Css.style;

  let collectionCardContainer =
    Css.(
      [%css
        {|
    {
      padding: 11px 14px 11px 14px;
      display: flexBox;
      flex-direction: column;
      flex: 1;
      text-align: center;
  }
  |}
      ]
    )
    |> Css.style;

  let collectionCardFooter =
    Css.(
      [%css
        {|{
          display: flexBox;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 4px 14px;
        }|}
      ]
    )
    |> Css.style;

  let collectionCardContent =
    Css.(
      [%css
        {|{
          display: flexBox;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 7px 7px 0px 7px;
          flex: 1;
      }|}
      ]
    )
    |> Css.style;
};

let make =
    (
      ~heading="collection",
      ~collectionName,
      ~collectionDescription,
      /* ~upvotes, */
      ~articles,
      /* ~followers, */
      ~lastUpdated=?,
      ~curatorImage=?,
      ~changeRoute=?,
      ~collectionId: string,
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
        className=Styles.collectionCardContainer>
        <Label text=heading />
        <div className=Styles.collectionCardContent>
          <Heading text=collectionName />
          <Paragraph text=collectionDescription />
          (
            switch (curatorImage) {
            | Some(string) => <img className=Styles.image src=string />
            | None => ReasonReact.null
            }
          )
          (
            switch (lastUpdated) {
            | Some(string) => <Label text=string />
            | None => ReasonReact.null
            }
          )
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.collectionCardFooter>
          /* <CardCounter value=upvotes label="upvotes" /> */
           <CardCounter value=articles label="Articles" /> </div>
      </div>
    </BaseCard>,
  /* <CardCounter value=followers label="Followers" /> */
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  collectionName: string,
  collectionDescription: string,
  /* upvotes: string|int, */
  articles: string,
  /* followers: string|int, */
  lastUpdated: string,
  /* curatorImage: string */
  changeRoute: string => unit,
};