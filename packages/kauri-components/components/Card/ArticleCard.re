let component = ReasonReact.statelessComponent("ArticleCard");

module Styles = {
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
    Css.(
      [%css
        {|
    {
      padding: 11px 14px 11px 14px;
      display: flexBox;
      flex-direction: column;
      flex: 1;
  }
  |}
      ]
    )
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

  let content = Css.([%css {|{
        flex: 1;
      }|}]) |> Css.style;
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
        <div className=Styles.content>
          <Label text=("Posted " ++ date) />
          <Heading text=title />
          <Paragraph text=content />
          (
            switch (tags) {
            | Some(tags) => <TagList tags />
            | None => ReasonReact.null
            }
          )
        </div>
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