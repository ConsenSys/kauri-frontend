/* tslint:disable */
import React from "react";
import { storiesOf } from "@storybook/react";
import TopContributors from "../components/TopContributors";

storiesOf("TopContributors", module).add("Default", () => (
  <TopContributors
    tags={["ethereum", "lolz", "hello world", "tags", "tags", "evm"]}
  />
));
