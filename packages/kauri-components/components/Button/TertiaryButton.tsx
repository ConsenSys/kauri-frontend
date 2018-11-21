import * as React from "react";
import styled from "../../lib/styled-components";
import {
  fontSize as fontSizeSS,
  fontWeight as fontWeightSS,
  color as colorSS,
  space as spaceSS,
  SpaceProps,
  FontSizeProps,
  FontWeightProps,
} from "styled-system";

const TertiaryButton = styled<
  { disabled: boolean } & SpaceProps & FontSizeProps & FontWeightProps,
  "button"
>("button")`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  text-transform: uppercase;
  color: #fff;
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  padding: 0px;
  > :first-child {
    height: 18px;
    width: 18px;
    ${spaceSS};
  }
  :hover {
    color: ${props => props.theme.colors.primary};
  }
  ${fontSizeSS};
  ${fontWeightSS};
  ${colorSS};
`;

interface IProps {
  icon?: React.ReactElement<any>;
  handleClick?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  type?: string;
  fontWeight?: number;
  fontSize?: number;
  space?: number;
  color?: string;
}

const Button: React.SFC<IProps> = ({
  type = "button",
  fontWeight = 700,
  fontSize = 0,
  space = 1,
  color = "white",
  disabled = false,
  handleClick,
  onClick,
  icon,
  children,
}) => (
  <TertiaryButton
    type={type}
    disabled={disabled}
    onClick={handleClick || onClick}
    mr={space}
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
  >
    {icon}
    {children}
  </TertiaryButton>
);

export default Button;
