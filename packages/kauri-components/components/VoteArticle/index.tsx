import * as React from "react";
import styled from "../../lib/styled-components";
import PrimaryButtonComponent from "../Button/PrimaryButton";
import SecondaryButtonComponent from "../Button/SecondaryButton";

const Container = styled.section`
  display: flex;
  > button:last-child {
    margin-left: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  positiveVoteAction: () => void;
  negativeVoteAction: () => void;
}

const Component: React.FunctionComponent<IProps> = props => (
  <Container>
    <PrimaryButtonComponent onClick={() => props.positiveVoteAction()}>
      Positive
    </PrimaryButtonComponent>
    <SecondaryButtonComponent
      color="textPrimary"
      border={"primary"}
      borderHover={"hoverTextColor"}
      onClick={() => props.negativeVoteAction()}
    >
      Negative
    </SecondaryButtonComponent>
  </Container>
);

export default Component;
