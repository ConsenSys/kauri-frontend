let component = ReasonReact.statelessComponent("ProfileBadges");

module Styles = {
  let container = Css.(style([display(`flex), flexDirection(column)]));

  let badgesContainer =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        marginTop(px(11)),
        selector("> img", [marginRight(px(10))]),
      ])
    );
};

let make = (~header, children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <ProfileHeaderLabel header />
      <div className=Styles.badgesContainer>
        (children |. ReasonReact.array)
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  header: string,
  children: array(ReasonReact.reactElement),
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~header=jsProps |. headerGet, jsProps |. childrenGet)
  );