let component = ReasonReact.statelessComponent("ArticleCard");

type article = {
  date: string,
  title: string,
  content: string,
  imageURL: string,
  username: string,
  profileImage: string,
  articleVersion: int,
};

module Styles = {
  let image =
    Css.(
      style([
        height(px(170)),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
      ])
    );

  let container = (~heightProp) =>
    switch (heightProp) {
    | Some(heightProp) =>
      Css.(
        style([
          display(`flex),
          flexDirection(column),
          flex(1),
          maxHeight(px(heightProp)),
        ])
      )
    | None => Css.(style([display(`flex), flexDirection(column), flex(1)]))
    };

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(flexStart),
        justifyContent(spaceBetween),
        padding2(~v=px(4), ~h=px(14)),
        marginBottom(px(10)),
      ])
    );

  let content =
    Css.(
      style([padding2(~v=px(11), ~h=px(14)), flex(1), overflow(hidden)])
    );
};

type pageType =
  | RinkebyPublicProfile;

let make =
    (
      ~tags=?,
      ~date: string,
      ~title: string,
      ~content: string,
      ~imageURL=?,
      ~pageType=?,
      ~username,
      ~userId,
      ~profileImage=?,
      ~changeRoute=?,
      ~articleId: string,
      ~articleVersion: int,
      ~cardHeight=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className={Styles.container(~heightProp=cardHeight)}>
        {
          switch (imageURL) {
          | Some(string) => <img className=Styles.image src=string />
          | None => ReasonReact.null
          }
        }
        <div
          className=Styles.content
          onClick={
            _ =>
              switch (changeRoute) {
              | Some(changeRoute) =>
                changeRoute(
                  {j|/article/$articleId/article-version/$articleVersion|j},
                )
              | None => ()
              }
          }>
          <Label text={"Posted " ++ date} />
          <Heading text=title />
          {
            content->(String.sub(0, 2))->(String.contains('{')) ?
              [%raw
                {|
                  (() => {
                    if (process.env.STORYBOOK !== 'true') {
                      var DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js").default;
                      return React.createElement(DescriptionRow, { record: { text: content$1 }, type: 'article card' }, null);
                    }
                  })()
                |}
              ] :
              <Paragraph text=content />
          }
          {
            switch (tags) {
            | Some(tags) => <TagList tags />
            | None => ReasonReact.null
            }
          }
        </div>
        <div
          className=Styles.footer
          onClick={
            _ =>
              switch (changeRoute, pageType) {
              | (Some(changeRoute), None) =>
                changeRoute({j|/public-profile/$userId|j})
              | (Some(_changeRoute), Some(_pageType)) => ()
              | (None, Some(_)) => ()
              | (None, None) => ()
              }
          }>
          <Separator direction="horizontal" marginTop=`auto />
          <UserWidgetSmall
            pageType
            username
            profileImage={
              switch (profileImage) {
              | Some(image) => image
              | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
              }
            }
          />
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  article,
  date: string,
  title: string,
  content: string,
  username: string,
  userId: string,
  articleId: string,
  articleVersion: int,
  cardHeight: int,
  changeRoute: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps->changeRouteGet,
      ~date=jsProps->dateGet,
      ~title=jsProps->titleGet,
      ~content=jsProps->contentGet,
      ~username=jsProps->usernameGet,
      ~userId=jsProps->userIdGet,
      ~articleId=jsProps->articleIdGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~articleVersion=jsProps->articleVersionGet,
      [||],
    )
  );