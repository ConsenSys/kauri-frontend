module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(`column),
        alignItems(`center),
        maxWidth(px(150)),
      ])
    );
  let count =
    Css.(
      style([
        color(hex("ffffff")),
        fontSize(px(20)),
        fontWeight(500),
        margin(px(0)),
        marginBottom(px(6)),
      ])
    );
  let name =
    Css.(
      style([color(hex("ffffff")), fontSize(px(11)), fontWeight(700)])
    );
};

let pluraliseCount = count =>
  switch (count) {
  | number when number > 1000000 =>
    let dividedFloat = float_of_int(number) /. 1000000.0;
    Js.Float.toPrecisionWithPrecision(dividedFloat, ~digits=2) ++ "M";
  | number when number > 1000 && number < 1000000 =>
    let dividedFloat = float_of_int(number) /. 1000.0;
    Js.Float.toPrecisionWithPrecision(dividedFloat, ~digits=2) ++ "K";
  | number => string_of_int(number)
  };

let lastStringValue = name => String.sub(name, String.length(name) - 1, 1);

let pluraliseName = (count, name) =>
  switch (count) {
  | count when count > 1 && lastStringValue(name |> String.lowercase) == "s" => name
  | count when count > 1 && lastStringValue(name |> String.lowercase) != "s" =>
    name ++ "s"
  | count when count == 1 && lastStringValue(name |> String.lowercase) == "s" =>
    String.sub(name, 0, String.length(name) - 1)
  | _ => name
  };
let component = ReasonReact.statelessComponent("Heading");

let make = (~name, ~count, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    Vrroom.(
      <div className=Styles.container>
        <h3 className=Styles.count> (count |> pluraliseCount |> text) </h3>
        <span className=Styles.name>
          (name |> pluraliseName(count) |> String.uppercase |> text)
        </span>
      </div>
    ),
};