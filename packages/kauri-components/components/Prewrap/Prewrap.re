open Vrroom;
let component = ReasonReact.statelessComponent("Greeting");

module Styles = {
  let card = Css.(style([whiteSpace(`preWrap)]));
};

let make = _children => {
  ...component,
  render: _self => Styles.(<div className=card> ("hey " |. text) </div>),
};