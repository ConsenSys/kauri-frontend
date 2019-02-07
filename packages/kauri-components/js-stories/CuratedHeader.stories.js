import React from "react";
import { storiesOf } from "@storybook/react";
import CuratedHeader from "../components/CuratedLists/CuratedHeader";

storiesOf("CuratedHeader", module).add("metamask", () => (
  <CuratedHeader
    name={"metamask"}
    header={{
      id: "metamask",
      resourceIdentifier: { type: "COMMUNITY" },
    }}
    Link={({ children }) => children}
    links={[{ url: "https://kauri.io", label: "View additional link" }]}
  />
));
