open Vrroom;
let component = ReasonReact.statelessComponent("FullName");

module Styles = {
  let fullName =
    Css.(
      style([
        color(hex("FFFFFF")),
        fontSize(px(14)),
        fontWeight(500),
        fontStyle(normal),
        textDecoration(none),
        wordWrap(breakWord),
        margin(px(0)),
        marginBottom(px(8)),
      ])
    );
};

let make = (~fullName, _children) => {
  ...component,
  render: _self => <h2 className=Styles.fullName> (fullName |. text) </h2>,
};

[@bs.deriving abstract]
type jsProps = {fullName: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~fullName=jsProps |. fullNameGet, [||])
  );