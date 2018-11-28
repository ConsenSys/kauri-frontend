import * as React from "react";
import styled, { css } from "../../lib/styled-components";
import {
  space,
  fontSize as fontSizeSS,
  fontWeight as fontWeightSS,
} from "styled-system";

export const BaseButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 80px;
  border-radius: 13px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};
  background: transparent;
  border: 1px solid ${props => props.theme.colors[props.bg]};
  text-transform: uppercase;
  > svg,
  img {
    height: 16px;
    ${space};
  }
  ${fontWeightSS};
  ${fontSizeSS};
  color: ${props => props.theme.colors[props.color]};
  :hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;
interface IButtonProps {
  bg: string;
  fontWeight: number;
  fontSize: number;
}
const AddTagButton = styled<IButtonProps, "button">("button")`
  ${BaseButtonCss};
  :hover {
    border: 2px solid ${props => props.theme.colors[props.bg]};
  }
`;

interface IProps {
  handleClick?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  bg: string;
  fontWeight?: number;
  fontSize?: number;
  space?: number;
  color?: string;
  text?: string;
  children?: Element;
}

export default ({
  bg = "primary",
  fontWeight = 700,
  fontSize = 0,
  color = "textPrimary",
  text = "Add Tag",
  handleClick,
  children,
  disabled,
}: IProps) => (
  <AddTagButton
    disabled={disabled}
    onClick={handleClick}
    bg={bg}
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
  >
    <img src="https://png.icons8.com/ios-glyphs/50/000000/plus-math.png" />
    {text || children}
  </AddTagButton>
);
