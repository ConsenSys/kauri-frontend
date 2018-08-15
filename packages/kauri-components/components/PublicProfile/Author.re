let component = ReasonReact.statelessComponent("Author");

type pageType =
  | SubmittingArticle;

let getPageType = pageType =>
  switch (pageType) {
  | _ => SubmittingArticle
  };

let getCursor = pageType =>
  switch (pageType) {
  | Some(pageType) =>
    switch (getPageType(pageType)) {
    | _ => `default
    }
  | None => `pointer
  };

module Styles = {
  let author = pageType =>
    Css.(
      style([
        display(flexBox),
        alignItems(center),
        cursor(getCursor(pageType)),
        selector(
          "> :last-child",
          [
            marginLeft(px(8)),
            selector(":hover", [color(hex("0BA986"))]),
          ],
        ),
      ])
    );
};

let make = (~userId, ~username, ~pageType, ~routeChangeAction=?, _children) => {
  ...component,
  render: _self =>
    <div
      className=(Styles.author(pageType))
      onClick=(
        _event =>
          switch (routeChangeAction) {
          | Some(routeChangeAction) =>
            routeChangeAction({j|/public-profile/$userId|j})
          | None => ()
          }
      )>
      <Avatar />
      <Username username pageType=Article />
    </div>,
};