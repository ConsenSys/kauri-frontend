// @flow
import React from 'react'
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

const bgHover = ({ theme: { bg: { primaryDark } } }) => primaryDark

const PrimaryButton = styled.button`
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

export default ({ bg = 'primary', fontWeight = 700, fontSize = 0, space = 2, color = 'white', handleClick, text, children, icon, disabled }: Props) =>
  <PrimaryButton disabled={disabled} mr={space} onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children || text}
  </PrimaryButton>
