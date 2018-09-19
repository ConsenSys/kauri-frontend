// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { space, bgColor } from 'styled-system'

const bgHover = ({ theme: { colors: { primaryDark } } }) => primaryDark

export const BaseButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => disabled ? '0.3' : '1'};
  > svg, img {
    height: 18px;
    width: 18px;
  }
  :hover {
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    background-color: ${bgHover};
  }
  ${bgColor};
`

const AddMemberButton = styled.button`
  ${BaseButtonCss};
`

const AddIcon = () => <img src='https://png.icons8.com/ios-glyphs/50/000000/plus-math.png' />

type Props = {
  icon: React.Node,
  handleClick: any => void,
  disabled?: boolean,
}

export default ({ bg = 'primary', fontWeight = 700, fontSize = 0, icon = <AddIcon />, handleClick, disabled }: Props) =>
  <AddMemberButton disabled={disabled} mr={space} onClick={handleClick} bg={bg} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
  </AddMemberButton>
