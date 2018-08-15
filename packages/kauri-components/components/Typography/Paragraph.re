let component = ReasonReact.statelessComponent("Paragraph");

module Styles = {
  let paragraph = (~colorProp, ~sizeProp) =>
    Css.(
      style([
        fontSize(px(sizeProp)),
        margin2(~v=px(10), ~h=px(0)),
        fontWeight(400),
        color(hex(colorProp)),
      ])
    );
};

let make = (~text, ~color="#1E2428", ~size=14, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div className=(Styles.paragraph(~colorProp=color, ~sizeProp=size))>
      (ReasonReact.string(text))
    </div>,
};