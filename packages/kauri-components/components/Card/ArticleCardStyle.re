module Styles = {
  let image =
    Css.(
      style([
        height(px(170)),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
      ])
    );

  let container = (~heightProp) =>
    switch (heightProp) {
    | Some(heightProp) =>
      Css.(
        style([
          display(`flex),
          flexDirection(column),
          flex(1),
          maxHeight(px(heightProp)),
          minWidth(px(262)),
          textAlign(`left),
        ])
      )
    | None => Css.(style([display(`flex), flexDirection(column), flex(1)]))
    };

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(flexStart),
        justifyContent(center),
        height(px(50)),
        paddingLeft(px(15)),
        paddingRight(px(15)),
      ])
    );

  let content =
    Css.(
      style([padding2(~v=px(11), ~h=px(14)), flex(1), overflow(hidden)])
    );
};