import React from "react";
import styled from "../lib/styled-components";
import { storiesOf } from "@storybook/react";
import Select from "../components/Select";
import theme from "../lib/theme-config";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TooltipContainer = styled.div`
  display: flex;
  width: 300px;
  padding: ${theme.space[2]}px;
  flex-direction: column;
  position: relative;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[2]}px;
  }
  > * {
    cursor: pointer;
  }
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

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors.divider};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
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
