let component = ReasonReact.statelessComponent("Heading");

module Styles = {
  let label = (~colorProp, ~noMargin) =>
    Css.(
      style([
        fontSize(em(0.7)),
        textTransform(uppercase),
        fontWeight(600),
        noMargin
        ->Belt.Option.mapWithDefault(unsafe("margin", "10px 0px 10px 0px"), _ =>
            unsafe("margin", "0px")
          ),
        color(hex(colorProp)),
      ])
    );
};
let make = (~noMargin=?, ~text, ~color="1E2428", _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <label className={Styles.label(~colorProp=color, ~noMargin)}>
      {ReasonReact.string(text)}
    </label>,
};