[@bs.module "./Loading.js"]
external loading: ReasonReact.reactClass = "default";

let make = _children =>
  ReasonReact.wrapJsForReason(
    ~reactClass=loading,
    ~props=Js.Obj.empty(),
    [||],
  );