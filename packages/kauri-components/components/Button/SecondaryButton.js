// @flow
import * as React from 'react';
import styled from 'styled-components'
import { BaseButtonCss } from './PrimaryButton'

const SecondaryButton = styled.button`
  ${BaseButtonCss};
  border: 1px solid ${props => props.theme.colors[props.border]};
  :hover {
    border: 2px solid ${props => props.theme.colors[props.borderHover]};
  }
`

type Props = {
  icon?: React.Node,
  onClick?: () => void,
  handleClick?: () => void,
  disabled?: boolean,
  fontWeight?: number,
  fontSize?: number,
  width?: string,
  color?: string,
  space?: number,
  text?: string,
  bg?: string,
  border?: string,
  borderHover?: string,
  children?: React.Node,
}

export default ({ width, border = 'white', borderHover = 'primary', bg = 'transparent', fontWeight = 700, fontSize = 0, color = 'white', space = 2, onClick, handleClick, text = '', children, icon, disabled }: Props) =>
  <SecondaryButton type='button' width={width} disabled={disabled} border={border} borderHover={borderHover} mr={space} onClick={onClick || handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {text || children}
  </SecondaryButton>
