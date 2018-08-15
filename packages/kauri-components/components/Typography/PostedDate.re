let component = ReasonReact.statelessComponent("PostedDate");

module Styles = {
  let container =
    Css.(
      style([
        color(hex("FFFFFF")),
        fontSize(px(12)),
        fontWeight(500),
        selector("> :last-child", [marginLeft(px(12)), fontWeight(700)]),
      ])
    );
};

type dateType =
  | FromNow
  | Posted
  | Updated;
let getDateType = dateType =>
  switch (dateType) {
  | FromNow => "Posted "
  | Posted => "Posted "
  | Updated => "Updated "
  };

let parseDateField = (dateType, date_field) =>
  switch (dateType) {
  | FromNow =>
    MomentRe.Moment.(
      fromNow(MomentRe.moment(date_field), ~withoutSuffix=Some(false))
    )
  | Updated =>
    MomentRe.Moment.(
      fromNow(MomentRe.moment(date_field), ~withoutSuffix=Some(false))
    )

  | Posted =>
    MomentRe.Moment.(format("D MMMM YYYY", MomentRe.moment(date_field)))
  };
let make = (~dateType, ~date_field: string, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    Vrroom.(
      <div className=Styles.container>
        <span> (getDateType(dateType) |. String.uppercase |. text) </span>
        <span>
          (parseDateField(dateType, date_field) |. String.uppercase |. text)
        </span>
      </div>
    ),
};

[@bs.deriving abstract]
type jsProps = {
  dateType: string,
  date_field: string,
};

let getDateType = dateType =>
  switch (dateType) {
  | "Posted" => Posted
  | "Updated" => Updated
  | "FromNow" => FromNow
  | _ => Posted
  };
let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (dateType, date_field) = jsProps |. (dateTypeGet, date_fieldGet);
      make(~dateType=getDateType(dateType), ~date_field, [||]);
    },
  );