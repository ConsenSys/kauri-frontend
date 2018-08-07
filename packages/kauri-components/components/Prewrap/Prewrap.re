open Vrroom;
let component = ReasonReact.statelessComponent("Greeting");

module Styles = {
  let preWrap = `preWrap;
  let card =
    Css.(
      [%css
        {|
          {
            white-space: preWrap;
          }
      |}
      ]
      |> style
    );
};

let make = _children => {
  ...component,
  render: _self => Styles.(<div className=card> ("hey " |. text) </div>),
};