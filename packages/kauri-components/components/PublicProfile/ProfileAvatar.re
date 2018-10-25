let component = ReasonReact.statelessComponent("ProfileAvatar");

module Styles = {
  let mask =
    Css.(
      style([width(px(100)), height(px(100)), borderRadius(px(50))])
    );

  let rinkebyProfileAvatarContaienr =
    Css.(
      style([
        display(`flex),
        alignItems(center),
        selector("> :last-child", [marginLeft(px(20))]),
      ])
    );
  let rinkebyProfileAvatar =
    Css.(
      style([
        display(`flex),
        justifyContent(center),
        alignItems(center),
        height(px(100)),
        width(px(100)),
        borderRadius(px(50)),
        backgroundColor(hex("0BA986")),
      ])
    );

  let userInitial =
    Css.(
      style([color(hex("FFFFFF")), fontSize(px(30)), fontWeight(700)])
    );

  let username =
    Css.(
      style([
        color(hex("FFFFFF")),
        fontSize(px(24)),
        fontWeight(500),
        maxWidth(px(800)),
        overflow(`hidden),
        textOverflow(`ellipsis),
      ])
    );
};

type pageType =
  | RinkebyPublicProfile;

let getPageType = (pageType, username, avatarURL) =>
  switch (pageType, username, avatarURL) {
  | (Some(RinkebyPublicProfile), Some(username), None) =>
    <section className=Styles.rinkebyProfileAvatarContaienr>
      <div className=Styles.rinkebyProfileAvatar>
        <span className=Styles.userInitial>
          {
            username->String.sub(0, 1)
            |> String.uppercase
            |> ReasonReact.string
          }
        </span>
      </div>
      <span className=Styles.username>
        {username |> String.lowercase |> ReasonReact.string}
      </span>
    </section>
  | (_, None, Some(avatarURL)) => <img src=avatarURL className=Styles.mask />
  | (_, _, _) => <img src="" className=Styles.mask />
  };

let make = (~username=?, ~pageType=?, ~avatarURL=?, _children) => {
  ...component,
  render: _self => getPageType(pageType, username, avatarURL),
};

[@bs.deriving abstract]
type jsProps = {
  avatarURL: string,
  pageType,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~pageType=jsProps |> pageTypeGet,
      ~avatarURL=jsProps->avatarURLGet,
      [||],
    )
  );