[@bs.module "../../../kauri-components/components/Card/ArticleCard.js"]
external articleCardComponent: ReasonReact.reactClass = "default";

[@bs.deriving jsConverter]
type resourceType = [
  | [@bs.as "community"] `Community
  | [@bs.as "article"] `Article
];

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
      ~resourceType: resourceType=`Article,
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
      "resourceType": resourceTypeToJs(resourceType),
      "userAvatar": userAvatar,
      "userId": userId,
      "imageURL": imageURL,
      "cardWidth": cardWidth,
      "cardHeight": cardHeight,
      "linkComponent": linkComponent,
    },
    children,
  );