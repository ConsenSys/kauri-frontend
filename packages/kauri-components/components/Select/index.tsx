import * as React from "react";
import { Tooltip } from "react-tippy";
import styled from "../../lib/styled-components";
import { Label } from "../Typography";
import theme from "../../lib/theme-config";

export const TooltipContainer = styled.div`
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

export const TooltipArrowAtTop = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  top: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
`;

const DownArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xlinkHref="http://www.w3.org/1999/xlink"
  >
    <rect
      x="12"
      width="12"
      height="12"
      transform="rotate(90 12 0)"
      fill="url(#pattern0)"
    />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="12"
      height="12"
    >
      <rect
        x="12"
        width="12"
        height="12"
        transform="rotate(90 12 0)"
        fill="url(#pattern1)"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect
        x="12"
        width="12"
        height="12"
        transform="rotate(90 12 0)"
        fill="#0BA986"
      />
    </g>
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.00961538)" />
      </pattern>
      <pattern
        id="pattern1"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.00961538)" />
      </pattern>
      <image
        id="image0"
        width="104"
        height="104"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const Select = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 300px;
  height: 40px;
  cursor: pointer;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.borderTextArea};
  box-sizing: border-box;
  border-radius: 4px;
  :hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
  > :first-child {
    margin: auto;
  }
  > :last-child {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  placeHolder: string;
  children: React.ReactElement<any>;
  value: string | null | undefined;
}

export default ({ children, placeHolder, value }: IProps) => {
  React.useEffect(() => {
    const styleDOMNode = document.createElement("style");
    const newGlobalCss = ".tippy-tooltip { margin: 0px; }";
    const headDOMNode =
      document.head || document.getElementsByTagName("head")[0];

    if (styleDOMNode) {
      styleDOMNode.type = "text/css";
      styleDOMNode.appendChild(document.createTextNode(newGlobalCss));
    }

    headDOMNode.appendChild(styleDOMNode);

    return () => {
      if (headDOMNode) {
        headDOMNode.removeChild(styleDOMNode);
      }
    };
  }, []);

  return (
    <Tooltip
      className="aids"
      html={children}
      position="bottom"
      trigger="click"
      unmountHTMLWhenHide={true}
    >
      <Select>
        <Label textTransform="uppercase">{value || placeHolder}</Label>
        <DownArrowIcon />
      </Select>
    </Tooltip>
  );
};
