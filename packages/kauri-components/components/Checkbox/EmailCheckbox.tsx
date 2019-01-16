import * as React from "react";
import { Tooltip } from "react-tippy";
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";
import Checkbox, { IProps } from "./index";

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
  bottom: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(45deg);
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

const ReferenceContainer = styled.div`
  display: flex;
  width: 70px;
`;

const Component: React.FunctionComponent<IProps> = props => (
  <ReferenceContainer>
    <Tooltip
      html={<Content />}
      position="top"
      trigger="mouseenter"
      unmountHTMLWhenHide={true}
    >
      <Checkbox
        label="email"
        onChange={props.onChange}
        disabled={props.disabled}
        checked={props.checked}
      />
    </Tooltip>
  </ReferenceContainer>
);

export default Component;
