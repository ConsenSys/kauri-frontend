let component = ReasonReact.statelessComponent("Username");

type pageType =
  | Article
  | PublicProfile;

let getColor = pageType =>
  switch (pageType) {
  | PublicProfile => "FFFFFF"
  | Article => "1E2428"
  };

module Styles = {
  let username = pageType =>
    Css.(
      style([
        maxWidth(px(250)),
        overflow(hidden),
        fontSize(px(12)),
        fontWeight(700),
        color(hex(getColor(pageType))),
      ])
    );
};
let make = (~username, ~pageType, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <span className=(Styles.username(pageType))>
      (ReasonReact.string(username))
    </span>,
};