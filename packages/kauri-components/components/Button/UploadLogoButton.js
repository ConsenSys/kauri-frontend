// @flow
import * as React from 'react'
import styled from 'styled-components'
import { fontSize, fontWeight, color, space } from 'styled-system'

const UploadLogoButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({theme: { colors: { primary } }}) => primary};
  border-radius: 4px;
  background-color: transparent;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  height: ${props => props.height};
  width: ${props => props.height};
  text-transform: uppercase;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  > :first-child {
    height: 18px;
    width: 18px;
    ${space};
  }
  :hover {
    border: 2px solid ${({theme: { colors: { primary } }}) => primary};
  }
  ${fontSize};
  ${color};
`

type Props = {
  icon?: () => React.Node,
  children?: React.Node,
  handleClick: () => void;
  disabled?: boolean;
  fontSize?: number,
  space?: number,
  color?: string,
  height?: string,
  text?: string,
}

export default ({ fontSize = 0, space = 2, color = 'textPrimary', height = '100px', text = 'Logo', handleClick, children, disabled }: Props) =>
  <UploadLogoButton mb={space} height={height} disabled={disabled} onClick={handleClick} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    <img src='https://png.icons8.com/color/50/000000/upload.png' />
    {text || children}
  </UploadLogoButton>
