let component = ReasonReact.statelessComponent("Avatar");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(`row),
        selector("> :not(:first-child)", [marginLeft(px(50))]),
      ])
    );
};

type statistics = {
  name: string,
  count: int,
};

let make = (~statistics, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      (
        Belt.Array.map(statistics, statistic =>
          <StatisticCount name=statistic##name count=statistic##count />
        )
        |> ReasonReact.array
      )
    </div>,
};