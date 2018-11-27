import * as React from 'react'
import styled from 'styled-components'
import { fontSize, color, space } from 'styled-system'

interface IButtonProps {
  bg?: string;
  height: string;
  width: string;
  fontSize?: number,
  color?: string,
}

interface IProps extends IButtonProps {
  className: string;
  children?: Element,
  handleClick: () => void;
  disabled?: boolean;
  space?: number,
  text?: string,
}

const UploadLogoButton = styled.button`
  border: 1px solid ${({theme: { colors: { primary } }}) => primary};
  border-radius: 4px;
  background: ${(props:IButtonProps) => props.bg ? `url(${props.bg}) center center` : 'transparent'};
  background-size: cover;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  height: ${props => props.height};
  width: ${props => props.width};
  padding: 0;
  text-transform: uppercase;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  :hover {
    border: 2px solid ${({theme: { colors: { primary } }}) => primary};
  }
  ${fontSize};
  ${color};
`

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

export default ({ className, bg, fontSize = 0, color = 'textPrimary', height = '100px', width = '100px', text = 'Logo', handleClick, children, disabled }: IProps) =>
  <UploadLogoButton
    className={className}
    bg={bg}
    height={height}
    width={width}
    disabled={disabled} 
    onClick={handleClick}
    color={color}
    fontSize={fontSize}>
    <Overlay>
    <img src='https://png.icons8.com/color/50/000000/upload.png' />
      {text || children}
    </Overlay>
  </UploadLogoButton>
