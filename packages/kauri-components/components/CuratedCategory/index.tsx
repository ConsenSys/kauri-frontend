import React from "react";
import styled from "../../lib/styled-components";
import { Label, BodyCard } from "../Typography";
import Image from "../Image";
import theme from "../../lib/theme-config";

const Container = styled<{ background: null | string }, "div">("div")`
  display: flex;
  z-index: 1;
  position: relative;
  flex-direction: column;
  width: 290px;
  height: 70px;
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 4px;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    height: 60px;
    width: 170px;
    > a {
      z-index: 9001;
    }
    > a > div > *:last-child {
      display: none;
    }
  }
`;

const Content = styled.div`
  display: flex;
  z-index: 9001;
  position: absolute;
  flex-direction: column;
  text-overflow: ellipsis;
  padding: ${props => props.theme.space[2]}px;
  overflow-x: hidden;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  category: string;
  description: string;
  background: string | null;
  linkComponent: (
    childrenProps: React.ReactElement<any>
  ) => React.ReactElement<any>;
}

const CuratedCategory: React.FunctionComponent<IProps> = ({
  category,
  description,
  linkComponent,
  background,
}) => (
  <Container background={background}>
    {background && (
      <Image
        asBackground={true}
        height="70px"
        width="290px"
        mobileHeight="60px"
        mobileWidth="170px"
        overlay={{ color: theme.bgPrimary, opacity: 0.7 }}
        image={background}
        borderRadius={"4px"}
      />
    )}
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
