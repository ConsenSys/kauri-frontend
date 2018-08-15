let component = ReasonReact.statelessComponent("Heading");

module Styles = {
  let label = (~colorProp) =>
    Css.(
      style([
        fontSize(em(0.7)),
        textTransform(uppercase),
        fontWeight(600),
        lineHeight(1.6),
        unsafe("margin", "10px 0px 10px 0px"),
        color(hex(colorProp)),
      ])
    );
};
let make = (~text, ~color="#1E2428", _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <label className=(Styles.label(~colorProp=color))>
      (ReasonReact.string(text))
    </label>,
};