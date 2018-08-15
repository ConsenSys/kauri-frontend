let component = ReasonReact.statelessComponent("Attributions");

module Styles = {
  let container =
    Css.(
      style([display(`flex), selector("> div", [marginRight(px(36))])])
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