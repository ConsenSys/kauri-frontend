module Styles = {
  let container = Css.(style([width(px(300)), marginTop(px(5))]));
  let heading =
    Css.(
      style([color(hex("1E2428")), fontSize(px(11)), fontWeight(700)])
    );
};
let component = ReasonReact.statelessComponent("Outline");
let make =
    (
      ~headings,
      ~username,
      ~userId,
      ~userAvatar,
      ~linkComponent=?,
      /* ~pageType,  */
      ~text="OWNER",
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      {
        switch (Array.length(headings)) {
        | 0 => ReasonReact.null
        | _ =>
          <Vrroom.Fragment>
            <OutlineHeader />
            <OutlineHeadings headings />
            <Separator marginY=20 direction="horizontal" color=LightGray />
          </Vrroom.Fragment>
        }
      }
      <OutlineHeader text />
      {
        Belt.Option.mapWithDefault(
          linkComponent,
          <UserAvatar
            username=username->Belt.Option.getWithDefault(userId)
            userAvatar=userAvatar->Belt.Option.getWithDefault("")
            userId
          />,
          linkComponent =>
          linkComponent(
            <UserAvatar
              username=username->Belt.Option.getWithDefault(userId)
              userAvatar=userAvatar->Belt.Option.getWithDefault("")
              userId
            />,
          )
        )
      }
      <Separator marginY=20 direction="horizontal" color=LightGray />
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  headings: array(string),
  username: Js.Nullable.t(string),
  userId: string,
  userAvatar: Js.Nullable.t(string),
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  pageType: Js.Nullable.t(string),
  text: Js.Nullable.t(string),
};
let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (
        headings,
        username,
        userId,
        userAvatar,
        linkComponent,
        text,
        /* pageType */
      ) =
        jsProps
        ->(
            headingsGet,
            usernameGet,
            userIdGet,
            userAvatarGet,
            linkComponentGet,
            textGet,
            /* pageTypeGet, */
          );
      /* let pageType = pageType->Js.Nullable.toOption; */
      let text =
        text->Js.Nullable.toOption->Belt.Option.getWithDefault("OWNER");

      make(
        ~headings,
        ~username=username |> Js.Nullable.toOption,
        ~userAvatar=userAvatar |> Js.Nullable.toOption,
        ~userId,
        ~linkComponent,
        ~text,
        /* ~pageType, */
        [||],
      );
    },
  );