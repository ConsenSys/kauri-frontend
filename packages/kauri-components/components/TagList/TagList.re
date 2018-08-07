let component = ReasonReact.statelessComponent("TagList");

module Styles = {
  let container =
    Css.(
      [%css
        {|{
            display: flexBox;
            flex-direction: column;
        }|}
      ]
    )
    |> Css.style;
  let tagContainer =
    Css.(
      [%css {|{
        display: flexBox;
        flex-direction: row;
    }|}]
    )
    |> Css.style;

  let tag =
    Css.(
      [%css
        {|{
        font-size: 10px;
        font-weight: 700;
        margin-right: 6px;
    }|}
      ]
    )
    |> Css.style;

  let heading =
    Css.(
      [%css
        {|{
        font-size: 10px;
        text-transform: uppercase;
        margin-bottom: 6px
    }|}
      ]
    )
    |> Css.style;
};

let make = (~tags, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.heading> (ReasonReact.string("Tags")) </div>
      <div className=Styles.tagContainer>
        (
          ReasonReact.array(
            Array.map(
              tag =>
                <div className=Styles.tag key=tag>
                  (ReasonReact.string(String.uppercase(tag)))
                </div>,
              Array.sub(tags, 0, 3),
            ),
          )
        )
        <div className=Styles.tag>
          (
            ReasonReact.string(
              "+"
              ++ string_of_int(
                   Array.length(tags) - Array.length(Array.sub(tags, 0, 3)),
                 ),
            )
          )
        </div>
      </div>
    </div>,
};