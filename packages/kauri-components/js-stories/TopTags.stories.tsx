/* tslint:disable */
import React from "react";
import { storiesOf } from "@storybook/react";
import TopTags from "../components/TopTags";

storiesOf("TopTags", module).add("Default", () => (
  <TopTags tags={["ethereum", "lolz", "hello world", "tags", "tags", "evm"]} />
));
