import React from "react";
import styled, { css } from "../../lib/styled-components";
import { Label, BodyCard } from "../Typography";
import { getURL } from "../Image";

const getBackgroundImageURL = (props: { background: string | null }) =>
  props.background && getURL(props.background);

const backgroundImageCSS = css<{ background: string | null }>`
  background-image: url(${getBackgroundImageURL});
  background-size: cover;
`;

const Container = styled<{ background: null | string }, "div">("div")`
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 70px;
  padding: ${props => props.theme.space[2]}px;
  background: ${props => props.theme.colors.bgPrimary};
  ${props => props.background && backgroundImageCSS};
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
