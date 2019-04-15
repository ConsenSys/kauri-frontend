import * as React from "react";
import styled from "../../lib/styled-components";
import { Title2 } from "../Typography";
import { RenderCardContent } from "../CuratedLists";
import SecondaryButtonComponent from "../Button/SecondaryButton";

const DEFAULT_CARD_WIDTH = 305;

const LatestContentSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px ${props => props.theme.padding};
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: 0px ${props => props.theme.space[2]}px;
  }
`;

const LatestContentCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(290px, ${DEFAULT_CARD_WIDTH}px)
  );
  grid-gap: ${props => props.theme.space[2]}px
    ${props => props.theme.space[3]}px;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    justify-content: center;
  }
`;

const AllContentButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[3]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    > :not(:last-child) {
      margin-right: ${props => props.theme.space[0]}px;
      margin-bottom: ${props => props.theme.space[2]}px;
    }
    flex-direction: column;
  }
`;

interface IProps {
  content: any;
  Link: any;
  linkComponent: (
    children: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
}

const LatestContent: React.FunctionComponent<IProps> = props => {
  return (
    <LatestContentSection>
      <Title2>Latest Content</Title2>
      <LatestContentCardContainer>
        {props.content.map(
          RenderCardContent({ fromAdmin: false, Link: props.Link })
        )}
      </LatestContentCardContainer>
      <AllContentButtonsContainer>
        {props.linkComponent(
          <SecondaryButtonComponent
            color="textPrimary"
            width={"140px"}
            border={"primary"}
          >
            All Articles
          </SecondaryButtonComponent>,
          `/articles`
        )}
        {props.linkComponent(
          <SecondaryButtonComponent
            color="textPrimary"
            width={"140px"}
            border={"primary"}
          >
            All Collections
          </SecondaryButtonComponent>,
          `/collections`
        )}
        {props.linkComponent(
          <SecondaryButtonComponent
            color="textPrimary"
            width={"140px"}
            border={"primary"}
          >
            All Communities
          </SecondaryButtonComponent>,
          `/communities`
        )}
      </AllContentButtonsContainer>
    </LatestContentSection>
  );
};

export default LatestContent;
