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

type pageType =
  | CollectionPage;

let make = (~statistics, ~pageType=?, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      {
        Belt.Array.map(statistics, statistic =>
          <StatisticCount
            pageType
            key=statistic##name
            name=statistic##name
            count=statistic##count
          />
        )
        |> ReasonReact.array
      }
    </div>,
};

type statistic = {
  .
  "name": string,
  "count": int,
};

[@bs.deriving abstract]
type jsProps = {
  statistics: array(statistic),
  pageType: Js.Nullable.t(string),
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let pageType =
        switch (jsProps->pageTypeGet->Js.Nullable.toOption) {
        | Some(_) => Some(CollectionPage)
        | None => None
        };
      let statistics = jsProps->statisticsGet;
      make(~statistics, ~pageType, [||]);
    },
  );