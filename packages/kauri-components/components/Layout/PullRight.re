let component = ReasonReact.statelessComponent("PullRight");

module Style = {
  let pullRight =
    Css.(style([marginLeft(`auto), height(px(35)), cursor(`auto)]));
};

let make = children => {
  ...component,
  render: _self => <div className=Style.pullRight> ...children </div>,
};