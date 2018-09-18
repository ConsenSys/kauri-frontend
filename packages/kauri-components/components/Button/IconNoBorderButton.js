// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize, fontWeight, color, space } from 'styled-system'

const IconNoBorderButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
  ${fontSize};
  ${fontWeight};
  ${color};
  > :first-child {
    height: 18px;
    width: 18px;
    ${space};
  }
`

type Props = {
  icon: React.Node,
  children: React.ChildrenArray<T>,
}

export default ({ icon, children, fontWeight = 700, fontSize = 0, space = 2, color = 'white' }: Props) =>
  <IconNoBorderButton mr={space} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children}
  </IconNoBorderButton>
