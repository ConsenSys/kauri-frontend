let component = ReasonReact.statelessComponent("ArticleCard");

module Styles = {
  let card =
    Css.(
      [%css
        {|
        {
          display: flexBox;
          flex-direction: column;
          padding-top: 11px;
          padding-bottom: 11px;
          border-radius: 4px;
          box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.11);
          background: rgb(255, 255, 255);
      }
      |}
      ]
    )
    |> Css.style;
  let image =
    Css.(
      [%css
        {|
      {
        height: 170px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    |}
      ]
    )
    |> Css.style;

  let container =
    Css.([%css {|
    {
      padding: 11px 14px 11px 14px;
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
};

let make =
    (
      ~tags=?,
      ~date: string,
      ~title: string,
      ~content: string,
      ~imageURL=?,
      ~username,
      ~views,
      ~upvotes,
      ~profileImage=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      (
        switch (imageURL) {
        | Some(string) => <img className=Styles.image src=string />
        | None => ReasonReact.null
        }
      )
      <div className=Styles.container>
        <Label text=("Posted " ++ date) />
        <Heading text=title />
        <Paragraph text=content />
        (
          switch (tags) {
          | Some(tags) => <TagList tags />
          | None => ReasonReact.null
          }
        )
        <Separator direction="horizontal" />
        <div className=Styles.footer>
          <UserWidgetSmall
            username
            profileImage=(
              switch (profileImage) {
              | Some(image) => image
              | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
              }
            )
          />
          <CardCounter value=views label="Views" />
          <CardCounter value=upvotes label="Upvotes" />
        </div>
      </div>
    </BaseCard>,
};