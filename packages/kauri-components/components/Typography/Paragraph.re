let component = ReasonReact.statelessComponent("Paragraph");

module Styles = {
  let paragraph =
    Css.(
      [%css
        {|
          {
            font-size: 14px;
            margin: 10px 0px;
            max-height: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        }
        |}
      ]
    )
    |> Css.style;
};
let make = (~text, ~className=?, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div className=Styles.paragraph> (ReasonReact.string(text)) </div>,
};