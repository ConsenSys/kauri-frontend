// @flow
import * as React from 'react';
import styled from 'styled-components'
import { BaseButtonCss } from './PrimaryButton'

const bgHover = ({ theme: { bg: { secondaryBlueDark } } }) => secondaryBlueDark

const SecondaryButton = styled.button`
  ${BaseButtonCss};
  :hover {
    background-color: ${bgHover};
  }
`

type Props = {
  icon?: React.Node,
  handleClick: () => void,
  disabled?: boolean,
  fontWeight?: number,
  fontSize?: number,
  color?: string,
  space?: number,
  text?: string,
  bg?: string, 
  children?: React.Node,
}

export default ({ bg = 'secondaryBlue', fontWeight = 700, fontSize = 0, color = 'white', space = 2, handleClick, text ='', children, icon, disabled }: Props) =>
  <SecondaryButton disabled={disabled} mr={space} onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {text || children}
  </SecondaryButton>
