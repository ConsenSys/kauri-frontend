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

  let container = (~cardHeightProp) =>
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        flex(1),
        maxHeight(px(cardHeightProp)),
        minWidth(px(262)),
        textAlign(`left),
      ])
    );

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(flexStart),
        justifyContent(center),
        height(px(50)),
        paddingLeft(px(14)),
        paddingRight(px(14)),
      ])
    );

  let content =
    Css.(
      style([padding2(~v=px(11), ~h=px(14)), flex(1), overflow(hidden)])
    );
};

let cardContent = (~title, ~content, ~cardHeight) =>
  <>
    <Heading cardHeight text=title />
    {
      content
      |> Js.String.substring(~from=0, ~to_=2)
      |> Js.String.includes("{") ?
        [%raw
          {|
                  (() => {
                    if (process.env.STORYBOOK !== 'true') {
                      var DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js").default;
                      return React.createElement(DescriptionRow, { record: { text: content }, type: 'article card', cardHeight: cardHeight }, null);
                    }
                  })()
          |}
        ] :
        <Paragraph text=content />
    }
  </>;

let publicProfile = (~pageType, ~username, ~userId) =>
  <UserWidgetSmall
    pageType
    username=
      username
      ->Belt.Option.getWithDefault(
          Js.String.substring(~from=0, ~to_=11, userId)
          ++ "..."
          ++ Js.String.substring(
               ~from=Js.String.length(userId) - 13,
               ~to_=11,
               userId,
             ),
        )
  />;

type pageType =
  | RinkebyPublicProfile
  | Collection;

let make =
    (
      ~tags=?,
      ~date: string,
      ~title: string,
      ~content: string,
      ~articleId,
      ~articleVersion,
      ~imageURL=?,
      ~pageType=?,
      ~linkComponent=?,
      ~username,
      ~userId,
      /* ~profileImage=?, */
      ~cardHeight=290,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className={Styles.container(~cardHeightProp=cardHeight)}>
        {
          switch (imageURL) {
          | Some(string) => <img className=Styles.image src=string />
          | None => ReasonReact.null
          }
        }
        <div className=Styles.content>
          <Label text={"Posted " ++ date} />
          {
            switch (linkComponent) {
            | Some(linkComponent) =>
              linkComponent(
                cardContent(~title, ~content, ~cardHeight),
                {j|/article/$articleId/v$articleVersion|j},
              )
            | None => cardContent(~title, ~content, ~cardHeight)
            }
          }
          {
            switch (tags) {
            | Some(tags) => <TagList tags />
            | None => ReasonReact.null
            }
          }
        </div>
        <Separator marginX=14 marginY=0 direction="horizontal" />
        <div className=Styles.footer>
          {
            switch (linkComponent, pageType) {
            | (Some(linkComponent), None) =>
              linkComponent(
                publicProfile(~pageType, ~username, ~userId),
                {j|/public-profile/$userId|j},
              )
            | (Some(_), Some(_pageType)) =>
              publicProfile(~pageType, ~username, ~userId)
            | (None, None) => publicProfile(~pageType, ~username, ~userId)
            | (None, Some(_)) => publicProfile(~pageType, ~username, ~userId)
            }
          }
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  article,
  date: string,
  title: string,
  articleId: string,
  articleVersion: string,
  content: string,
  linkComponent:
    (ReasonReact.reactElement, string) => ReasonReact.reactElement,
  username: Js.Nullable.t(string),
  userId: string,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~articleId=jsProps->articleIdGet,
      ~articleVersion=jsProps->articleVersionGet,
      ~date=jsProps->dateGet,
      ~title=jsProps->titleGet,
      ~content=jsProps->contentGet,
      ~username=jsProps->usernameGet->Js.Nullable.toOption,
      ~userId=jsProps->userIdGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );