import React from "react";
import styled from "../lib/styled-components";
import { storiesOf } from "@storybook/react";
import Select, { TooltipContainer } from "../components/Select";
import Divider from "../components/Divider";
import theme from "../lib/theme-config";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  :hover {
    color: ${theme.colors.hoverTextColor};
  }
`;

const Content = () => {
  return (
    <TooltipContainer>
      <Label>Collection 1</Label>
      <Divider />
      <Label>Collection 2</Label>
    </TooltipContainer>
  );
};

storiesOf("Select", module).add("Create Collection", () => (
  <Container>
    <Select value={null} placeHolder="Collection name">
      <Content />
    </Select>
  </Container>
));
