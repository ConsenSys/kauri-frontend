import * as React from "react";
import styled from "../../lib/styled-components";

interface IButtonStyleProps {
  bg: string;
  disabled: boolean;
  bgHover: string;
}

const AddMemberButton = styled<IButtonStyleProps, "button">("button")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background ${props => props.theme.colors[props.bg]};
  opacity: ${props => (props.disabled ? "0.3" : "1")};
  > svg, img {
    height: 18px;
    width: 18px;
  }
  :hover {
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    background-color: ${props => props.theme.colors[props.bgHover]};
  }
  transition: all 0.3s;
`;

interface IProps {
  handleClick?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  bg?: string;
  bgHover?: string;
  fontWeight?: number;
  fontSize?: number;
}

const AddMemberButtonComponent: React.FunctionComponent<IProps> = ({
  bg = "primary",
  bgHover = "primaryDark",
  handleClick,
  onClick,
  disabled,
}) => (
  <AddMemberButton
    type="button"
    disabled={Boolean(disabled)}
    onClick={onClick || handleClick}
    bg={bg}
    bgHover={bgHover}
  >
    <img src="https://png.icons8.com/ios-glyphs/50/000000/plus-math.png" />
  </AddMemberButton>
);

export default AddMemberButtonComponent;
