import * as React from "react";
import styled from "../../lib/styled-components";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import { Title2 } from "../Typography";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  content: Array<any | null> | null;
  linkComponent: (
    children: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
}

const PublishYourOwnContentCTA: React.FunctionComponent<IProps> = props => (
  <Container>
    <Title2>Publish your own content</Title2>
    <Buttons>
      {props.content &&
        props.content.map(
          content =>
            content &&
            props.linkComponent(
              <SecondaryButtonComponent
                color="textPrimary"
                border={"primary"}
                width={"290px"}
              >
                {content.name}
              </SecondaryButtonComponent>,
              content.link
            )
        )}
    </Buttons>
  </Container>
);

export default PublishYourOwnContentCTA;
