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
          padding: 4px 14px;
        }|}
      ]
    )
    |> Css.style;

  let content =
    Css.(
      [%css {|{
    padding: 11px 14px 11px 14px;
        flex: 1;
      }|}]
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
      ~changeRoute=?,
      ~articleId: string,
      ~articleVersion: int,
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
              changeRoute(
                {j|/article/$articleId/article-version/$articleVersion|j},
              )
            | None => ()
            }
        )
        className=Styles.container>
        (
          switch (imageURL) {
          | Some(string) => <img className=Styles.image src=string />
          | None => ReasonReact.null
          }
        )
        <div className=Styles.content>
          <Label text=("Posted " ++ date) />
          <Heading text=title />
          (
            content |. String.sub(0, 2) |. String.contains('{') ?
              [%raw
                {|
                  (() => {
                    if (process.env.STORYBOOK !== 'true') {
                      var DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js").default;
                      return React.createElement(DescriptionRow, { record: { text: content$1 } }, null);
                    }
                  })()
                |}
              ] :
              <Paragraph text=content />
          )
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

[@bs.deriving abstract]
type jsProps = {
  date: string,
  title: string,
  content: string,
  imageURL: string,
  username: string,
  profileImage: string,
  articleVersion: int,
  changeRoute: string => unit,
};