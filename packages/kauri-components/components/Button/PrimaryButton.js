// @flow
import * as React from 'react';
import styled, { css } from 'styled-components'
import { space, fontSize, fontWeight, bg, color } from 'styled-system'

export const BaseButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 136px;
  max-width: 150px;
  ${props => typeof props.width !== 'undefined' && `width: ${props.width}; max-width: unset;`};
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  > svg, img {
    height: 16px;
    ${space};
  }
  text-transform: uppercase;
  opacity: ${({ disabled }) => disabled ? '0.3' : '1'};
  ${fontWeight};
  ${fontSize};
  ${bg};
  ${color};
  :hover {
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
}
`

const bgHover = props => props.bgHover ? props.bgHover : props.theme && props.theme.colors && props.theme.colors.primaryDark

const PrimaryButton = styled.button`
  ${BaseButtonCss};
  :hover {
    background-color: ${bgHover};
  }
`

type Props = {
  icon?: React.Node,
  handleClick?: () => void,
  onClick?: () => void,
  disabled?: boolean,
  type?: string,
  bg?: string,
  bgHover?: string,
  fontWeight?: number,
  fontSize?: number,
  space?: number,
  color?: string,
  text?: string,
  width?: string,
  className?: string,
  children?: React.Node,
}

export default (
  {
    bg = 'primary',
    bgHover,
    fontWeight = 700,
    fontSize = 0,
    space = 2,
    color = 'white',
    type = 'submit',
    onClick,
    handleClick,
    text = '',
    children,
    icon,
    disabled,
    width,
    className,
  }: Props) =>
    <PrimaryButton
    type={type}
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
