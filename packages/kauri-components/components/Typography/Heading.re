module Styles = {
  let heading = (~colorProp, ~sizeProp) =>
    Css.(
      [%css
        {|
           {
               font-size: px(sizeProp);
               font-weight: 500;
               margin: 6px 0px;
               color: hex(colorProp);
               text-transform: capitalize;
         }
         |}
      ]
    )
    |> Css.style;
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~text, ~color="#333333", ~size=20, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className=(Styles.heading(~colorProp=color, ~sizeProp=size))>
      (ReasonReact.string(text))
    </h3>,
};