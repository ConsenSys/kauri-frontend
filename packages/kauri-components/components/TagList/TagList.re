let component = ReasonReact.statelessComponent("TagList");

module Styles = {
  let container = Css.(style([display(`flex), flexDirection(column)]));

  let tagContainer = Css.(style([display(`flex), flexDirection(row)]));

  let tag =
    Css.(style([fontSize(px(10)), fontWeight(700), marginRight(px(6))]));

  let heading =
    Css.(
      style([
        fontSize(px(10)),
        textTransform(uppercase),
        marginBottom(px(6)),
      ])
    );
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