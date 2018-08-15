module Styles = {
  let heading = (~colorProp, ~sizeProp) =>
    Css.(
      style([
        fontSize(px(sizeProp)),
        fontWeight(500),
        margin2(~v=px(6), ~h=px(0)),
        color(hex(colorProp)),
        textTransform(capitalize),
      ])
    );
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~text, ~color="#1E2428", ~size=20, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className=(Styles.heading(~colorProp=color, ~sizeProp=size))>
      (ReasonReact.string(text))
    </h3>,
};