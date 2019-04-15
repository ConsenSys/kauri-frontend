import * as React from "react";
import styled from "../../lib/styled-components";
import { Title2, BodyCard } from "../Typography";
import SecondaryButtonComponent from "../Button/SecondaryButton";

const Container = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.space[3]}px;
  background: ${props => props.theme.colors.bgSecondary};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    display: none;
  }
`;

const Content = styled.section`
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const ImportBannerCopy = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const NewsletterBanner: React.FunctionComponent = _ => {
  return (
    <Container>
      <Content>
        <Title2 color="white">Import your content into Kauri</Title2>
        <ImportBannerCopy>
          <BodyCard color="white" textAlign={"center"}>
            Import a single article or your entire Medium profile/publication in
            under 5 minutes with our importer!
          </BodyCard>
          <BodyCard color="white" textAlign={"center"}>
            Coming soon: Wordpress importer
          </BodyCard>
        </ImportBannerCopy>
        <SecondaryButtonComponent
          onClick={() => {
            window.location.href = "https://import.kauri.io";
          }}
        >
          Import from Medium
        </SecondaryButtonComponent>
      </Content>
    </Container>
  );
};

export default NewsletterBanner;
