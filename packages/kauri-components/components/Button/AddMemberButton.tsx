import * as React from "react";
import styled from "../../lib/styled-components";

interface IButtonStyleProps {
  bg: string;
  disabled: boolean;
  bgHover: string;
}

const AddMemberButton = styled<IButtonStyleProps, "img">("img")`
  height: 30px;
  width: 30px;
  cursor: pointer;
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
    src="/static/images/icons/add-member-icon.png"
    disabled={Boolean(disabled)}
    onClick={onClick || handleClick}
    bg={bg}
    bgHover={bgHover}
  />
);

export default AddMemberButtonComponent;
