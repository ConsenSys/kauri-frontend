import React from "react";
import { storiesOf } from "@storybook/react";
import Outline from "../components/Outline";

storiesOf("Outline Headings", module).add("Headings", () => (
  <Outline
    nfts={null}
    headings={["Intro", "Turning Web3.js functions into JavaScript promises"]}
    username={"rej156"}
    userId="0x1234567890"
    userAvatar={null}
    text={"AUTHOR"}
    linkComponent={undefined}
  />
));
