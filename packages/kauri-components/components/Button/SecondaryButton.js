// @flow
import React from 'react'
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
  children: React.ChildrenArray<T>,
  handleClick: any => void,
  disabled?: boolean,
}

export default ({ bg = 'secondaryBlue', fontWeight = 700, fontSize = 0, color = 'white', space = 2, handleClick, text, children, icon, disabled }: Props) =>
  <SecondaryButton disabled={disabled} mr={space} onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children || text}
  </SecondaryButton>
