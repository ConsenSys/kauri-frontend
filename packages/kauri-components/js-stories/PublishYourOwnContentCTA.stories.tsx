import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import PublishYourOwnContentCTA from "../components/PublishYourOwnContentCTA";

const Container = styled.div`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

storiesOf("PublishYourOwnContentCTA", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("Three buttons", () => <PublishYourOwnContentCTA />);
