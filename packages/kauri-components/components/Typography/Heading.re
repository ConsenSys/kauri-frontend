module Styles = {
  let heading =
    Css.(
      [%css
        {|
           {
               font-size: 20px;
               font-weight: 600;
               margin: 6px 0px;
         }
         |}
      ]
    )
    |> Css.style;
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className=Styles.heading> (ReasonReact.string(text)) </h3>,
};