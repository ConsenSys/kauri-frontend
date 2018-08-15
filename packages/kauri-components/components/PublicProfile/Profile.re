module Container = {
  let component = ReasonReact.statelessComponent("ProfileContainer");

  module Styles = {
    let container =
      Css.(
        style([
          display(`flex),
          selector("> :first-child", [marginRight(px(20))]),
        ])
      );
  };

  let make = children => {
    ...component,
    render: _self =>
      <section className=Styles.container>
        (children |. ReasonReact.array)
      </section>,
  };

  [@bs.deriving abstract]
  type jsProps = {children: array(ReasonReact.reactElement)};

  let default =
    ReasonReact.wrapReasonForJs(~component, jsProps =>
      make(jsProps |. childrenGet)
    );
};

module Metadata = {
  let component = ReasonReact.statelessComponent("ProfileMetaData");

  module Styles = {
    let container = Css.(style([display(`flex), flexDirection(column)]));
  };

  let make = children => {
    ...component,
    render: _self =>
      <div className=Styles.container> (children |. ReasonReact.array) </div>,
  };

  [@bs.deriving abstract]
  type jsProps = {children: array(ReasonReact.reactElement)};

  let default =
    ReasonReact.wrapReasonForJs(~component, jsProps =>
      make(jsProps |. childrenGet)
    );
};