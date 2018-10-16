[@bs.module "./index.js"]
external userAvatarComponent: ReasonReact.reactClass = "default";

[@bs.deriving jsConverter]
type variant = [ | [@bs.as "white"] `White];

let make =
    (
      ~color: option(string)=?,
      ~username: option(string)=?,
      ~userAvatar: option(string)=?,
      ~userId: string,
      ~imageURL: option(string)=?,
      ~fullWidth: option(bool)=?,
      ~variant: option(variant)=?,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=userAvatarComponent,
    ~props={
      "color": color |> Js.Nullable.fromOption,
      "avatar": userAvatar |> Js.Nullable.fromOption,
      "username": username |> Js.Nullable.fromOption,
      "userId": userId,
      "imageURL": imageURL |> Js.Nullable.fromOption,
      "fullWidth": fullWidth |> Js.Nullable.fromOption,
      "variant": Belt.Option.map(variant, v => variantToJs(v)),
    },
    children,
  );