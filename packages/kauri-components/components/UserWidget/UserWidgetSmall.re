let component = ReasonReact.statelessComponent("UserWidgetSmall");

module Styles = {
  let container =
    Css.(style([display(`flex), flexDirection(row), alignItems(center)]));

  let image =
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginRight(px(8)),
      ])
    );

  let imagePlaceholder = (~colorProp) =>
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginRight(px(8)),
        display(`flex),
        alignItems(`center),
        justifyContent(`center),
        background(hex(colorProp)),
        color(
          hex(colorProp->String.lowercase == "ffffff" ? "1E2428" : "FFFFFF"),
        ),
        textTransform(`capitalize),
      ])
    );

  let baseUsername = colorProp =>
    Css.[
      fontSize(px(14)),
      fontWeight(700),
      overflow(hidden),
      maxWidth(px(220)),
      color(hex(colorProp)),
      textTransform(`lowercase),
      whiteSpace(`preWrap),
      overflow(`hidden),
      textOverflow(`ellipsis),
    ];

  let username = (~colorProp, ~pageType) =>
    switch (pageType) {
    | Some(_) => Css.style(baseUsername(colorProp))
    | None =>
      Css.style(
        List.append(
          Css.[
            selector(":hover", [cursor(`pointer), color(hex("0BA986"))]),
          ],
          baseUsername(colorProp),
        ),
      )
    };
};

let make = (~username, ~profileImage=?, ~color="1E2428", ~pageType, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      {
        switch (profileImage) {
        | Some(string) => <img className=Styles.image src=string />
        | _ =>
          <div className={Styles.imagePlaceholder(~colorProp=color)}>
            {
              ReasonReact.string(
                Js.String.substring(~from=0, ~to_=1, username),
              )
            }
          </div>
        }
      }
      <div className={Styles.username(~colorProp=color, ~pageType)}>
        {ReasonReact.string(username)}
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  username: string,
  color: string,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~username=jsProps->usernameGet,
      ~pageType=None,
      ~color=jsProps->colorGet,
      [||],
    )
  );