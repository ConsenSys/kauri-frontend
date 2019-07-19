import * as React from "react";
import styled, { css } from "styled-components";
import {
  space as spaceSS,
  fontSize as fontSizeSS,
  fontWeight as fontWeightSS,
  background as backgroundSS,
  color as colorSS,
  FontWeightProps,
  FontSizeProps,
  BackgroundProps,
  ColorProps,
  SpaceProps,
} from "styled-system";

export const BaseButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 136px;
  max-width: 150px;
  ${props =>
    typeof props.width !== "undefined" &&
    `width: ${props.width}; max-width: unset;`};
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  > svg,
  img {
    height: 16px;
    ${spaceSS};
  }
  text-transform: uppercase;
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};
  ${fontWeightSS};
  ${fontSizeSS};
  ${backgroundSS};
  ${colorSS};
  :hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

interface IPrimaryButtonSSProps {
  bgHover: string | undefined;
  width: string | undefined;
}

const PrimaryButton = styled<
  IPrimaryButtonSSProps &
    FontWeightProps &
    FontSizeProps &
    BackgroundProps &
    ColorProps &
    SpaceProps,
  "button"
>("button")`
  ${BaseButtonCss};
  :hover {
    background-color: ${props =>
      props.bgHover
        ? props.bgHover
        : props.theme && props.theme.colors && props.theme.colors.primaryDark};
  }
`;

interface IProps {
  icon?: React.ReactElement<any>;
  handleClick?: () => void;
  onClick?: void | (() => void);
  disabled?: boolean;
  type?: string;
  bg?: string;
  bgHover?: string;
  fontWeight?: number;
  fontSize?: number;
  space?: number;
  color?: string;
  text?: string;
  width?: string;
  className?: string;
}

const PrimaryButtonComponent: React.SFC<IProps> = ({
  bg = "primary",
  bgHover,
  fontWeight = 700,
  fontSize = 0,
  space = 2,
  color = "white",
  type = "submit",
  onClick,
  handleClick,
  text = "",
  children,
  icon,
  disabled,
  width,
  className,
}) => (
  <PrimaryButton
    type={type as any}
    disabled={disabled}
    mr={space}
    onClick={onClick || handleClick}
    bg={bg}
    bgHover={bgHover}
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    width={width}
    className={className}
  >
    {icon}
    {text || children}
  </PrimaryButton>
);

export default PrimaryButtonComponent;
