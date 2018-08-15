open Vrroom;
open Webapi.Dom;
[@bs.val] external setTimeout : (unit => unit, int) => unit = "";

type windowLocation;
[@bs.val] external windowLocation : windowLocation = "window.location";
[@bs.set] external setLocationHash : (windowLocation, string) => unit = "hash";

module Styles = {
  let listItem =
    Css.(
      style([
        color(hex("0BA986")),
        fontSize(px(11)),
        listStylePosition(outside),
        paddingLeft(px(0)),
        cursor(`pointer),
      ])
    );

  let list = Css.(style([paddingLeft(px(16))]));

  let heading =
    Css.(
      style([color(hex("1E2428")), fontSize(px(14)), fontWeight(500)])
    );
};

let handleClick = (event, heading) => {
  event |> ReactEvent.Mouse.preventDefault;
  let headingLowerCasedWithNoSpacesOrSpecialChars =
    heading
    |> Revamp.replace({| |}, _ => "")
    |> Revamp.replace({|\W|_|}, _letter => "")
    |> String.lowercase;
  let headerDomElement =
    Document.getElementById(
      headingLowerCasedWithNoSpacesOrSpecialChars,
      document,
    );

  switch (headerDomElement) {
  | Some(domElement) =>
    Element.scrollIntoViewWithOptions(
      {"behavior": "smooth", "block": "start"},
      domElement,
    );
    setTimeout(
      () =>
        windowLocation
        |. setLocationHash(headingLowerCasedWithNoSpacesOrSpecialChars),
      700,
    );
  | None => ()
  };
};
let component = ReasonReact.statelessComponent("OutlineHeading");
let make = (~headings: array(string), _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <ul className=Styles.list>
      (
        headings
        |. Belt.Array.mapWithIndex((index, heading) =>
             <li
               onClick=(event => handleClick(event, heading))
               key=(heading ++ string_of_int(index))
               className=Styles.listItem>
               <span className=Styles.heading> (heading |. text) </span>
             </li>
           )
        |. ReasonReact.array
      )
    </ul>,
};