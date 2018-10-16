[@bs.module "../../../kauri-components/components/Card/ArticleCard.js"]
external articleCardComponent: ReasonReact.reactClass = "default";

[@bs.deriving abstract]
type jsProps = {
  id: string,
  version: int,
  content: string,
  date: int,
  title: string,
  username: Js.Nullable.t(string),
  userAvatar: Js.Nullable.t(string),
  userId: string,
  imageURL: Js.Nullable.t(string),
  cardWidth: int,
  cardHeight: int,
  linkComponent:
    (ReasonReact.reactElement, string) => ReasonReact.reactElement,
};

let make =
    (
      ~id,
      ~version,
      ~content,
      ~date,
      ~title,
      ~username,
      ~userId,
      ~userAvatar,
      ~imageURL=?,
      ~cardWidth=290,
      ~cardHeight=290,
      ~linkComponent,
      children,
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=articleCardComponent,
    ~props={
      "id": id,
      "version": version,
      "content": content,
      "date": date,
      "title": title,
      "username": username,
      "userAvatar": userAvatar,
      "userId": userId,
      "imageURL": imageURL,
      "cardWidth": cardWidth,
      "cardHeight": cardHeight,
      "linkComponent": linkComponent,
    },
    children,
  );