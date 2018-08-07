let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {

  let image =
    Css.(
      [%css
        {|
      {
        height: 80px;
        width: 80px;
        border-radius: 4px;
    }
    |}
      ]
    )
    |> Css.style;

  let container =
    Css.([%css {|
    {
      padding: 11px 14px 11px 14px;
      display: flexBox;
      flex-direction: column;
      flex: 1;
      text-align: center;
  }
  |}])
    |> Css.style;

  let footer =
    Css.(
      [%css
        {|{
          display: flexBox;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }|}
      ]
    )
    |> Css.style;

  let content =
  Css.(
    [%css
      {|{
          display: flexBox;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 7px;
          flex: 1;
      }|}
    ]
  )
  |> Css.style;
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
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className=Styles.container>
        <Label text=heading />
        <div className=Styles.content>
        (
            switch (communityLogo) {
            | Some(string) => <img className=Styles.image src=string />
            | None => ReasonReact.null
            }
        )
            <Heading text=communityName />
            <Paragraph text=communityDescription />
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.footer>
            <CardCounter value=followers label="Followers" />
            <CardCounter value=articles label="Articles" />
            <CardCounter value=views label="Views" />
        </div>
      </div>
    </BaseCard>,
};