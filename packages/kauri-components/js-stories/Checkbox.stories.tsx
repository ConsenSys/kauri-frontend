import React from "react";
import { storiesOf } from "@storybook/react";
import { Tooltip } from "react-tippy";
import styled from "../lib/styled-components";
import Checkbox from "../components/Checkbox";
import theme from "../lib/theme-config";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  align-items: center;
  > :first-child {
    margin-top: 5px;
    margin-left: 5px;
  }
  background: #1f2428;
`;

const containerWidth = 190;

const TooltipContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  padding: ${theme.space[2]}px;
  width: ${containerWidth}px;
  text-align: center;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[1]}px;
  }
  > * {
    cursor: pointer;
  }
  > span:last-child {
    text-transform: uppercase;
    font-size: ${theme.fontSizes[0]}px;
    font-weight: ${theme.fontWeight[3]};
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
`;

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  top: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(-45deg);
  border-radius: 2px;
`;

export const Content: React.SFC<{}> = () => (
  <TooltipContainer>
    <TooltipArrow />
    <span>
      Keep this checked to receive our newsletter with the latest tutorials and
      content series
    </span>
  </TooltipContainer>
);

storiesOf("Checkbox", module)
  .add("not checked and not disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={false}
        checked={false}
      />
    </Container>
  ))
  .add("checked and not disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={false}
        checked={true}
      />
    </Container>
  ))
  .add("not checked and disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={true}
        checked={false}
      />
    </Container>
  ))
  .add("checked and disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={true}
        checked={true}
      />
    </Container>
  ))
  .add("email tooltip hover", () => (
    <Container>
      <Tooltip
        html={<Content />}
        position="bottom"
        trigger="mouseenter"
        unmountHTMLWhenHide={true}
      >
        <Checkbox
          label="email"
          onChange={() => alert("heuy")}
          disabled={false}
          checked={false}
        />
      </Tooltip>
    </Container>
  ));
