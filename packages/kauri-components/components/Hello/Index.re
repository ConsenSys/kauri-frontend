let textColor = (name: string) =>
  switch (name) {
  | "blue" => Css.blue
  | "yellow" => Css.yellow
  | "white" => Css.white
  | _ => Css.red
  };

let className =
  Css.(
    [%css
      {|
      {
        color: textColor("blue");
        background-color: white;
        border-bottom: 1px dashed #eee;
        border-right-color: rgb(1, 0, 1);
        width: 70%;
      }
      :hover {
        color: textColor("white");
      }
    |}
    ]
  )
  |> Css.style;

let currentDateFormatted =
  BsLuxon.(
    DateTime.(
      local()
      |> setZone("Europe/London")
      |> plus(`Duration(Duration.from(~weeks=1, ())))
      |> toFormat("dd/MM/yyyy hh:mm")
    )
  );

let component = ReasonReact.statelessComponent("Greeting");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <span className>
        (ReasonReact.string("POSTED " ++ currentDateFormatted))
      </span>
    </div>,
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));