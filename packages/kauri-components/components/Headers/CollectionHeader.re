[@bs.deriving abstract]
type jsProps = {
  date: string,
  name: string,
  description: string,
  username: string,
  updated: string,
  routeChangeAction: string => unit,
};

let component = ReasonReact.statelessComponent("CollectionHeader");

module Styles = {
  let container =
    Css.(
      [%css
        {|{
            display: flexBox;
            width: 100%;
            flex-direction: column;
        }|}
      ]
    )
    |> Css.style;
};

let make =
    (
      ~routeChangeAction=?,
      ~name,
      ~description,
      ~username,
      ~updated,
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <Heading size=28 text=name color="ffffff" />
      <Paragraph text=description color="ffffff" />
      <Label text=updated color="ffffff" />
      <Label text=username color="ffffff" />
    </div>,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~routeChangeAction=jsProps |. routeChangeActionGet,
      ~name=jsProps |. nameGet,
      ~description=jsProps |. descriptionGet,
      ~username=jsProps |. usernameGet,
      ~updated=jsProps |. updatedGet,
      [||],
    )
  );