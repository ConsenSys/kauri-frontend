let component = ReasonReact.statelessComponent("Paragraph");

module Styles = {
  let paragraph = (~colorProp, ~sizeProp) =>
    Css.(
      [%css
        {|
          {
            font-size: px(sizeProp);
            margin: 10px 0px;
            font-weight: 400;
            color: hex(colorProp);
        }
        |}
      ]
    )
    |> Css.style;
};
let make = (~text, ~color="#333333", ~size=14, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div className=(Styles.paragraph(~colorProp=color, ~sizeProp=size))>
      (ReasonReact.string(text))
    </div>,
};