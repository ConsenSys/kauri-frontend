let component = ReasonReact.statelessComponent("Heading");

module Styles = {
  let label =
    Css.(
      [%css
        {|
          {
              font-size: 0.7em;
              text-transform: uppercase;
              font-weight: 600;
              line-height: 1.6;
              margin: 10px 0px 10px 0;
        }
        |}
      ]
    )
    |> Css.style;
};
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <label className=Styles.label> (ReasonReact.string(text)) </label>,
};