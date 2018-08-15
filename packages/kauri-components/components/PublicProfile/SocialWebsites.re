let component = ReasonReact.statelessComponent("SocialWebsites");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        marginBottom(px(23)),
        selector("> *", [marginRight(px(5))]),
      ])
    );
};

let make = children => {
  ...component,
  render: _self =>
    <div className=Styles.container> (children |. ReasonReact.array) </div>,
};

[@bs.deriving abstract]
type jsProps = {children: array(ReasonReact.reactElement)};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(jsProps |. childrenGet)
  );