let component = ReasonReact.statelessComponent("CommunityHeader");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        width(`percent(100.0)),
        justifyContent(center),
        backgroundColor(hex("1E2428")),
        height(px(255)),
      ])
    );
};

let make = children => {
  ...component,
  render: _self => <div className=Styles.container> ...children </div>,
};