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

const bgHover = (props) => props.theme && props.theme.colors.primaryDark

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
  fontWeight?: number,
  fontSize?: number,
  space?: number,
  color?: string,
  text?: string,
  children?: React.Node,
}

export default ({ className, bg = 'primary', fontWeight = 700, fontSize = 0, space = 2, color = 'white', type = 'submit', onClick, handleClick, text = '', children, icon, disabled }: Props) =>
  <PrimaryButton className={className} type={type} disabled={disabled} mr={space} onClick={onClick || handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {text || children}
  </PrimaryButton>
