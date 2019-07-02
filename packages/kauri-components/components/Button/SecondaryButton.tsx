import * as React from "react";
import styled from "styled-components";
import {
  SpaceProps,
  BackgroundProps,
  FontSizeProps,
  FontWeightProps,
  ColorProps,
} from "styled-system";
import { BaseButtonCss } from "./PrimaryButton";

interface ISecondaryButtonProps {
  border: string;
  borderHover: string;
  width: string | undefined;
}

const SecondaryButton = styled<
  ISecondaryButtonProps &
    SpaceProps &
    BackgroundProps &
    FontSizeProps &
    FontWeightProps &
    ColorProps,
  "button"
>("button")`
  ${BaseButtonCss};
  box-shadow: 0px 0px 0px 1px ${props => props.theme.colors[props.border]};
  :hover {
    box-shadow: 0px 0px 0px 2px
      ${props => props.theme.colors[props.borderHover]};
  }
`;

interface IProps {
  icon?: React.ReactElement<any>;
  onClick?: void | (() => void);
  handleClick?: () => void;
  disabled?: boolean;
  fontWeight?: number;
  fontSize?: number;
  width?: string;
  color?: string;
  space?: number;
  text?: string;
  bg?: string;
  border?: string;
  borderHover?: string;
  "data-testid"?: string;
}

const SecondaryButtonComponent: React.SFC<IProps> = props => {
  const {
    width,
    border = "white",
    borderHover = "primary",
    bg = "transparent",
    fontWeight = 700,
    fontSize = 0,
    color = "white",
    space = 2,
    onClick,
    handleClick,
    text = "",
    children,
    icon,
    disabled,
  } = props;
  return (
    <SecondaryButton
      type="button"
      width={width}
      disabled={disabled}
      onClick={onClick || handleClick}
      border={border}
      borderHover={borderHover}
      mr={space}
      bg={bg}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      data-testid={props["data-testid"]}
    >
      {icon}
      {text || children}
    </SecondaryButton>
  );
};

export default SecondaryButtonComponent;
