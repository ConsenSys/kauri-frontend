import React from "react";
import styled from "../../lib/styled-components";
import { Label, BodyCard } from "../Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 70px;
  padding: ${props => props.theme.space[2]}px;
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 4px;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    height: 60px;
    width: 170px;
    > a > div > *:last-child {
      display: none;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  overflow-x: hidden;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  category: string;
  description: string;
  linkComponent: (
    childrenProps: React.ReactElement<any>
  ) => React.ReactElement<any>;
}

const CuratedCategory: React.FunctionComponent<IProps> = ({
  category,
  description,
  linkComponent,
}) => (
  <Container>
    {linkComponent(
      <Content>
        <Label textTransform="uppercase" color="white">
          {category}
        </Label>
        <BodyCard color="white">{description}</BodyCard>
      </Content>
    )}
  </Container>
);

export default CuratedCategory;
