let component = ReasonReact.statelessComponent("HorizontalSeparator");

module Styles = {
  let horizontal =
    Css.(
      [%css
        {|
        {
            height: 2px;
            background: #f2f2f2;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        |}
      ]
    )
    |> Css.style;

  let vertical =
    Css.(
      [%css
        {|
      {
          width: 2px;
          background: #f2f2f2;
          height: 100%;
      }
      |}
      ]
    )
    |> Css.style;
};

let directionStyle = d =>
  switch (d) {
  | "horizontal" => Styles.horizontal
  | "vertical" => Styles.vertical
  | _ => Styles.horizontal
  };

let make = (~direction, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => <div className=(directionStyle(direction)) />,
};