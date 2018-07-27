type postType =
  | UpdatedAt
  | Posted;

let currentDateFormatted =
  BsLuxon.(
    DateTime.(
      local()
      |> setZone("America/New_York")
      |> plus(`Duration(Duration.from(~weeks=1, ())))
      |> toFormat("DD")
    )
  );

let component = ReasonReact.statelessComponent("Greeting");

let className =
  Css.(
    [%style
      {|
    color: red;
    background-color: red;
    border-bottom: 1px dashed #eee;
    border-right-color: rgb(1, 0, 1);
    width: 70%;
    background: url(http://example.com/test.jpg)
  |}
    ]
  )
  |. Css.style;

let formatPostType = postType =>
  switch (postType) {
  | UpdatedAt => "Updated At"
  | Posted => "Posted"
  };

let postTypeFormatted = postType => formatPostType(postType);

let make = (~postType: postType, _children) => {
  ...component,
  render: _self =>
    <span className>
      (
        ReasonReact.string(
          postTypeFormatted(postType) ++ " " ++ currentDateFormatted,
        )
      )
    </span>,
};

[@bs.deriving abstract]
type jsProps = {postType: string};

let postTypeOfString = postType : postType =>
  switch (postType) {
  | "Posted" => Posted
  | _ => Posted
  };

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~postType=postTypeOfString(jsProps |. postTypeGet), [||])
  );