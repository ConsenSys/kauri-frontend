module Styles = {
  let heading =
    Css.(
      style([color(hex("1E2428")), fontSize(px(11)), fontWeight(700)])
    );
};
let component = ReasonReact.statelessComponent("OutlineHeading");
let make = (~text="Outline", _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className=Styles.heading>
      (ReasonReact.string(text |. String.uppercase))
    </h3>,
};