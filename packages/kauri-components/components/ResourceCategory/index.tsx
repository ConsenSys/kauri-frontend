import * as React from "react";
import styled from "../../lib/styled-components";
import { NavigationText } from "../Typography";
import theme from "../../lib/theme-config";

const DEFAULT_CARD_WIDTH = theme.DEFAULT_CARD_WIDTH;

const Container = styled<{ active: boolean }, "div">("div")`
  display: flex;
  width: ${DEFAULT_CARD_WIDTH}px;
  height: 60px;
  flex-direction: row;
  align-items: center;
  background: white;
  cursor: pointer;
  padding: ${props => props.theme.space[2]}px;
  box-shadow: 0 0 0 2px
    ${props => (props.active ? props.theme.primaryDark : "transparent")};
  > :last-child {
    margin-left: auto;
  }
  :hover {
    box-shadow: 0 0 0 2px
      ${props => (props.active ? props.theme.primaryDark : props.theme.primary)};
  }
`;

interface IProps {
  active: boolean;
  category: string;
  amount: number;
  onClick: any;
}

const ResourceCategory: React.SFC<IProps> = props => (
  <Container onClick={props.onClick} active={props.active}>
    <NavigationText color="primary">{props.category}</NavigationText>
    <NavigationText>{props.amount}</NavigationText>
  </Container>
);

export default ResourceCategory;
