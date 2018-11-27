import * as React from 'react';
import styled from 'styled-components'

const AddMemberButton = styled.button`${(props: IProps) => `
display: flex;
align-items: center;
justify-content: center;
height: 30px;
width: 30px;
border-radius: 50%;
border: none;
cursor: pointer;
background ${props.theme && props.theme.colors[props.bg]};
opacity: ${props.disabled ? '0.3' : '1'};
> svg, img {
  height: 18px;
  width: 18px;
}
:hover {
  cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props.theme && props.theme.colors[props.bgHover]};
}
transition: all 0.3s;
`}`;

interface IProps {
  handleClick?: () => void,
  disabled?: boolean,
  bg: string,
  bgHover: string,
  fontWeight: number,
  fontSize: number,
  theme?: {
    colors: {
      [color: string] : string;
    }
  };
}

export default ({ bg = 'primary', bgHover = 'primaryDark', fontWeight = 700, fontSize = 0, handleClick, disabled }: IProps) =>
  <AddMemberButton
    disabled={disabled}
    onClick={handleClick}
    bg={bg}
    bgHover={bgHover}
    fontSize={fontSize}
    fontWeight={fontWeight}>
    <img src='https://png.icons8.com/ios-glyphs/50/000000/plus-math.png' />
  </AddMemberButton>;
