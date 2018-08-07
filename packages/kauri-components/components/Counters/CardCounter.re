let component = ReasonReact.statelessComponent("CardCounter");

module Styles = {
  let container =
    Css.(
      [%css
        {|{
            display: flexBox;
            flex-direction: column;
            min-width: 50px;
            align-items: center;
        }|}
      ]
    )
    |> Css.style;

  let value =
    Css.(
      [%css
        {|{
            font-size: 14px;
            font-weight: 700;
    }|}
      ]
    )
    |> Css.style;

  let label =
    Css.(
      [%css
        {|{
        font-size: 10px;
        text-transform: uppercase;
        font-weight: 700;
    }|}
      ]
    )
    |> Css.style;
};

let make = (~value, ~label, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.value> (ReasonReact.string(value)) </div>
      <div className=Styles.label> (ReasonReact.string(label)) </div>
    </div>,
};