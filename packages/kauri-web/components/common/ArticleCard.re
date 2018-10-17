[@bs.module "../../../kauri-components/components/Card/ArticleCard.js"]
external articleCardComponent: ReasonReact.reactClass = "default";

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