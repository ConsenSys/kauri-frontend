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
      ~linkComponent=?,
      /* ~pageType,  */
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
      <OutlineHeader text="OWNER" />
      {
        Belt.Option.mapWithDefault(
          linkComponent,
          <UserWidgetSmall pageType=None username />,
          linkComponent =>
          linkComponent(<UserWidgetSmall pageType=None username />)
        )
      }
      <Separator marginY=20 direction="horizontal" color=LightGray />
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  headings: array(string),
  username: string,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  pageType: Js.Nullable.t(string),
};
let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (
        headings,
        username,
        linkComponent,
        /* pageType */
      ) =
        jsProps
        ->(
            headingsGet,
            usernameGet,
            linkComponentGet,
            /* pageTypeGet, */
          );
      /* let pageType = pageType->Js.Nullable.toOption; */
      make(
        ~headings,
        ~username,
        ~linkComponent,
        /* ~pageType, */
        [||],
      );
    },
  );