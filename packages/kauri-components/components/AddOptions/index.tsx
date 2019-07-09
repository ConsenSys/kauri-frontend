import * as React from "react";
import { Tooltip } from "react-tippy";
import styled from "../../lib/styled-components";
import { H6 } from "../Typography";
import AddIcon from "../Icon/AddIcon";

const AddButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  > :first-child {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  children: React.ReactElement<any>;
}

const AddOptions: React.FunctionComponent<IProps> = ({ children }) => (
  <Tooltip
    html={children}
    position="bottom"
    trigger="click"
    unmountHTMLWhenHide={true}
  >
    <AddButton>
      <AddIcon />
      <H6 textTransform="uppercase">Options</H6>
    </AddButton>
  </Tooltip>
);

export default AddOptions;
