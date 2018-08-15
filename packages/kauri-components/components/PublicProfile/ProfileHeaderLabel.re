open Vrroom;
let component = ReasonReact.statelessComponent("ProfileHeaderLabel");

module Styles = {
  let header =
    Css.(
      style([
        color(hex("FFFFFF")),
        fontSize(px(11)),
        fontWeight(300),
        fontStyle(normal),
        textDecoration(none),
        wordWrap(breakWord),
      ])
    );
};

let make = (~header, _children) => {
  ...component,
  render: _self =>
    <span className=Styles.header>
      (header |. String.uppercase |. text)
    </span>,
};

[@bs.deriving abstract]
type jsProps = {header: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~header=jsProps |. headerGet, [||])
  );