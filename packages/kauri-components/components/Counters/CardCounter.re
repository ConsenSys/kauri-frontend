let component = ReasonReact.statelessComponent("CardCounter");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        minWidth(px(50)),
        alignItems(center),
      ])
    );

  let value = Css.(style([fontSize(px(14)), fontWeight(700)]));

  let label =
    Css.(
      style([fontSize(px(10)), textTransform(uppercase), fontWeight(700)])
    );
};

let make = (~value, ~label, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.value> (ReasonReact.string(value)) </div>
      <div className=Styles.label> (ReasonReact.string(label)) </div>
    </div>,
};