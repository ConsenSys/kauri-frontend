// @flow
import * as React from 'react'
import styled from 'styled-components'
import { fontSize, color, space } from 'styled-system'

const UploadLogoButton = styled.button`
  border: 1px solid ${({theme: { colors: { primary } }}) => primary};
  border-radius: 4px;
  background: ${props => props.bg ? `url(${props.bg}) center center` : 'transparent'};
  background-size: cover;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  height: ${props => props.height};
  width: ${props => props.height};
  padding: 0;
  text-transform: uppercase;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  :hover {
    border: 2px solid ${({theme: { colors: { primary } }}) => primary};
  }
  ${fontSize};
  ${color};
`

const Icon = styled.div`
  background: url(${props => props.src}) center center;
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  background: rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;

  > :first-child {
    height: 18px;
    width: 18px;
    ${space};
  }
`;

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

export default ({ className, bg, fontSize = 0, space = 2, color = 'textPrimary', height = '100px', text = 'Logo', handleClick, children, disabled }: Props) =>
  <UploadLogoButton className={className} bg={bg} mb={space} height={height} disabled={disabled} onClick={handleClick} color={color} fontSize={fontSize}>
    <Overlay>
    <img src='https://png.icons8.com/color/50/000000/upload.png' />
      {text || children}
    </Overlay>
  </UploadLogoButton>
