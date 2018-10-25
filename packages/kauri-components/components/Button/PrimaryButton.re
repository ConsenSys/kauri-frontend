[@bs.module "./PrimaryButton"]
external primaryButton: ReasonReact.reactClass = "default";

[@bs.deriving abstract]
type jsProps = {onClick: unit => unit};

let make = (~onClick, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=primaryButton,
    ~props=jsProps(~onClick),
    children,
  );