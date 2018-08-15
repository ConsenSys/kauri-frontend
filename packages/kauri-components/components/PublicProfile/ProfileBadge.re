let component = ReasonReact.statelessComponent("ProfileBadge");

module Styles = {
  let mask =
    Css.(
      style([
        backgroundColor(hex("FFFFFF")),
        width(px(30)),
        height(px(30)),
        borderRadius(`percent(50.0)),
      ])
    );
};

let make = (~badgeURL, _children) => {
  ...component,
  render: _self => <img src=badgeURL className=Styles.mask />,
};

[@bs.deriving abstract]
type jsProps = {badgeURL: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~badgeURL=jsProps |. badgeURLGet, [||])
  );