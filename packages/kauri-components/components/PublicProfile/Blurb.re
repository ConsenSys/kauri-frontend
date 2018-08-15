open Vrroom;
let component = ReasonReact.statelessComponent("Blurb");

module Styles = {
  let blurb =
    Css.(
      style([
        color(hex("FFFFFF")),
        fontSize(px(14)),
        fontWeight(300),
        fontStyle(normal),
        textDecoration(none),
        wordWrap(breakWord),
        marginBottom(px(15)),
      ])
    );
};

let make = (~blurb, _children) => {
  ...component,
  render: _self => <span className=Styles.blurb> (blurb |. text) </span>,
};

[@bs.deriving abstract]
type jsProps = {blurb: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~blurb=jsProps |. blurbGet, [||])
  );