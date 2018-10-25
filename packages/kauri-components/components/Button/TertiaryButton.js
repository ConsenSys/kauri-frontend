// @flow
import * as React from 'react'
import styled from 'styled-components'
import { fontSize, fontWeight, color, space } from 'styled-system'

const TertiaryButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  text-transform: uppercase;
  color: #fff;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  padding: 0px;
  > :first-child {
    height: 18px;
    width: 18px;
    ${space};
  }
  :hover {
    color: ${props => props.theme && props.theme.colors && props.theme.colors['primary']};
  }
  ${fontSize};
  ${fontWeight};
  ${color};
`

type Props = {
  icon?: React.Node,
  handleClick?: () => void,
  onClick?: () => void,
  disabled?: boolean,
  type?: string,
  fontWeight?: number,
  fontSize?: number,
  space?: number,
  color?: string,
  children?: React.Node,
}

export default ({ type = 'button', fontWeight = 700, fontSize = 0, space = 1, color = 'white', handleClick, onClick, icon, children, disabled }: Props) =>
  <TertiaryButton type={type} disabled={disabled} onClick={handleClick || onClick} mr={space} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children}
  </TertiaryButton>
