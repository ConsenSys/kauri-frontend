import * as React from "react";
import styled from "../../lib/styled-components";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import { Title2 } from "../Typography";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const Component: React.FunctionComponent = _ => (
  <Container>
    <Title2>Publish your own content</Title2>
    <Buttons>
      <SecondaryButtonComponent
        color="textPrimary"
        border={"primary"}
        width={"290px"}
      >
        Write Article
      </SecondaryButtonComponent>
      <SecondaryButtonComponent
        width={"290px"}
        color="textPrimary"
        border="primary"
      >
        Create Collection
      </SecondaryButtonComponent>
      <SecondaryButtonComponent
        color="textPrimary"
        width={"290px"}
        border="primary"
      >
        Import Content
      </SecondaryButtonComponent>
    </Buttons>
  </Container>
);

export default Component;
