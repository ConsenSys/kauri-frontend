let component = ReasonReact.statelessComponent("Avatar");

module Styles = {
  let avatar =
    Css.(
      style([
        backgroundColor(hex("1E2428")),
        width(px(30)),
        height(px(30)),
        borderRadius(`percent(50.0)),
      ])
    );
};

let make = _children => {
  ...component,
  render: _self => <div className=Styles.avatar />,
};