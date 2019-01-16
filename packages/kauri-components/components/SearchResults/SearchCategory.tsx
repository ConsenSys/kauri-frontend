import * as React from "react";
import styled from "../../lib/styled-components";
import { NavigationText } from "../Typography";

const Container = styled<{ active: boolean }, "div">("div")`
  display: flex;
  background: white;
  flex-direction: row;
  align-items: center;
  width: 291px;
  height: 60px;
  padding: ${props => props.theme.space[2]}px;
  box-shadow: 0 0 0 2px
    ${props => (props.active ? props.theme.primary : "transparent")};
  > :last-child {
    margin-left: auto;
  }
`;

interface IProps {
  active: boolean;
  category: string;
  amount: number;
}

const Component: React.SFC<IProps> = props => (
  <Container active={props.active}>
    <NavigationText color="primary">{props.category}</NavigationText>
    <NavigationText>{props.amount}</NavigationText>
  </Container>
);

export default Component;
