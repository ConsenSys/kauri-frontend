let component = ReasonReact.statelessComponent("ArticleAction");

module Styles = {
  let container =
    Css.(
      [%css
        {|
            {
              display: flexBox;
              align-items: center;
              justify-content: center;
              width: 200px;
              cursor: pointer;
            }
            > :first-child {
              margin-right: 9px;
            }
            > svg {
              width: 16px;
              height: 16px;
            }
        |}
      ]
      |> style
    );

  let text =
    Css.(
      [%css
        {|
          {
            font-size: 11px;
            font-weight: 500;
          }
      |}
      ]
      |> style
    );
};

let make = (~svgIcon, ~text, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      svgIcon
      <span className=Styles.text>
        (text |. String.uppercase |. Vrroom.text)
      </span>
    </div>,
};