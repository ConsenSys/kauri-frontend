// @flow
import React from 'react'
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
  > :first-child {
    height: 18px;
    width: 18px;
    ${space};
  }
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${fontSize};
  ${fontWeight};
  ${color};
`

type Props = {
  icon: React.Node,
  children: React.ChildrenArray<T>,
  handleClick: any => void;
  disabled?: boolean;
}

export default ({ fontWeight = 700, fontSize = 0, space = 2, color = 'white', handleClick, icon, children, disabled }: Props) =>
  <TertiaryButton disabled={disabled} onClick={handleClick} mr={space} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children}
  </TertiaryButton>
