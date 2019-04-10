import * as React from "react";
import styled from "../../lib/styled-components";
import { Title2 } from "../Typography";
import { RenderCardContent } from "../CuratedLists";
import SecondaryButtonComponent from "../Button/SecondaryButton";

const LatestContentSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px ${props => props.theme.padding};
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const LatestContentCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-count: 4;
  > :not(:nth-child(4n)) {
    margin-right: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[3]}px;
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
`;

interface IProps {
  content: any;
  Link: any;
}

const LatestContent: React.FunctionComponent<IProps> = props => {
  const { Link } = props;

  return (
    <LatestContentSection>
      <Title2>Latest Content</Title2>
      <LatestContentCardContainer>
        {props.content.map(
          RenderCardContent({ fromAdmin: false, Link: props.Link })
        )}
      </LatestContentCardContainer>
      <AllContentButtonsContainer>
        <Link href={`/articles`}>
          <SecondaryButtonComponent
            color="textPrimary"
            width={"140px"}
            border={"primary"}
          >
            All Articles
          </SecondaryButtonComponent>
        </Link>
        <Link href={`/collections`}>
          <SecondaryButtonComponent
            color="textPrimary"
            width={"140px"}
            border={"primary"}
          >
            All Collections
          </SecondaryButtonComponent>
        </Link>
        <Link href={`/communities`}>
          <SecondaryButtonComponent
            color="textPrimary"
            width={"140px"}
            border={"primary"}
          >
            All Communities
          </SecondaryButtonComponent>
        </Link>
      </AllContentButtonsContainer>
    </LatestContentSection>
  );
};

export default LatestContent;
