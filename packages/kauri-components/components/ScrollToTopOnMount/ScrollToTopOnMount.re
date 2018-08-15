open Vrroom;

[@bs.val] external scrollToTop : (int, int) => unit = "window.scrollTo";
let component = ReasonReact.statelessComponent("ScrollToTopOnMount");

let make = _children => {
  ...component,
  didMount: _self => scrollToTop(0, 0),
  render: _self => null,
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));