[@bs.module "react-tippy"]
external reactTooltip : ReasonReact.reactClass = "Tooltip";

[@bs.deriving jsConverter]
type trigger = [ | [@bs.as "click"] `Click | [@bs.as "mouseenter"] `Hover];

[@bs.deriving jsConverter]
type position = [ | [@bs.as "bottom"] `Bottom];

[@bs.deriving abstract]
type jsProps = {
  html: ReasonReact.reactElement,
  trigger: string,
  position: string,
};

let make = (~html, ~trigger, ~position, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=reactTooltip,
    ~props=
      jsProps(
        ~html,
        ~trigger=triggerToJs(trigger),
        ~position=positionToJs(position),
      ),
    children,
  );