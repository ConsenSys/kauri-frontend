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

const NewsletterBanner: React.FunctionComponent = _ => {
  return (
    <Container>
      <Content>
        <Title2 color="white">Import your content into Kauri</Title2>
        <BodyCard color="white" textAlign={"center"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quos
          quod error consectetur porro minima magni eius amet odit fugiat. Ullam
          vero voluptas nihil accusantium repellat? Quas pariatur molestiae
          atque!
        </BodyCard>
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
