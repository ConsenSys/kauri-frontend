open Vrroom;
let component = ReasonReact.statelessComponent("PersonalWebsite");

module Styles = {
  let website =
    Css.(
      style([
        color(hex("FFFFFF")),
        fontSize(px(13)),
        fontWeight(300),
        fontStyle(normal),
        textDecoration(none),
        wordWrap(breakWord),
      ])
    );
};

let make = (~website, _children) => {
  ...component,
  render: _self =>
    <a href=("https://" ++ website) className=Styles.website>
      (website |. text)
    </a>,
};

[@bs.deriving abstract]
type jsProps = {website: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~website=jsProps |. websiteGet, [||])
  );