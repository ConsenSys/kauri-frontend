let component = ReasonReact.statelessComponent("Heading");

module Styles = {
  let label = (~colorProp) =>
    Css.(
      [%css
        {|
          {
              font-size: 0.7em;
              text-transform: uppercase;
              font-weight: 500;
              line-height: 1.6;
              margin: 10px 0px 10px 0;
              color: hex(colorProp);
        }
        |}
      ]
    )
    |> Css.style;
};
let make = (~text, ~color="#333333", _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <label className=(Styles.label(~colorProp=color))>
      (ReasonReact.string(text))
    </label>,
};