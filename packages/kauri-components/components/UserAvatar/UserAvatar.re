[@bs.module "./index.js"]
external userAvatarComponent: ReasonReact.reactClass = "default";

[@bs.deriving jsConverter]
type variant = [ | [@bs.as "white"] `White];

[@bs.deriving abstract]
type jsProps = {
  color: string,
  avatar: string,
  username: string,
  userId: string,
  imageURL: string,
  fullWidth: bool,
  variant: string,
};

let make =
    (
      ~color: option(string)=?,
      ~avatar: option(string)=?,
      ~username: option(string)=?,
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
      "avatar": avatar |> Js.Nullable.fromOption,
      "username": username |> Js.Nullable.fromOption,
      "userId": userId,
      "imageURL": imageURL |> Js.Nullable.fromOption,
      "fullWidth": fullWidth |> Js.Nullable.fromOption,
      "variant": Belt.Option.map(variant, v => variantToJs(v)),
    },
    children,
  );