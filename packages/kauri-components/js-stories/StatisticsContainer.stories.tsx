import React from "react";
import { storiesOf } from "@storybook/react";
import StatisticsContainer from "../components/PublicProfile/StatisticsContainer";

storiesOf("StatisicsContainer", module)
  .add("No PageType", () => (
    <StatisticsContainer
      pageType={undefined}
      statistics={[
        { name: "Articles", count: 3 },
        { name: "Collections", count: 4 },
      ]}
    />
  ))
  .add("Collection PageType", () => (
    <StatisticsContainer
      pageType={"CreateCollectionPage"}
      statistics={[
        { name: "Articles", count: 3 },
        { name: "Collections", count: 4 },
      ]}
    />
  ));
