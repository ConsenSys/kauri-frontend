import * as React from "react";
import styled from "../lib/styled-components";
import { storiesOf } from "@storybook/react";
import ShareArticle from "../components/Tooltip/ShareArticle";

const DummyContainerForTippy = styled.div`
  display: flex;
  width: 100%;
`;

storiesOf("Share Article", module).add("Click for dropdown", () => (
  <DummyContainerForTippy>
    <ShareArticle
      url="https://www.facebook.com/donate/1937650849680964"
      title="Kauri"
    />
  </DummyContainerForTippy>
));
