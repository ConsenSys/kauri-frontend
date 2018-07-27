let component = ReasonReact.statelessComponent("BaseCard");

module Styles = {
  let card =
    Css.(
      [%css
        {|
        {
          display: flexBox;
          flex-direction: column;
          min-height: 270px;
          width: 290px;
          border-radius: 4px;
          background-color: #FFFFFF;
          box-shadow: 0 0 6px 0 rgba(0,0,0,0.11);
      }
      |}
      ]
    )
    |> Css.style;
};

let make = _children => {
  ...component,
  render: _self =>
    <div className=Styles.card> (_children |> ReasonReact.array) </div>,
};