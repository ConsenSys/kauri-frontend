import * as React from "react";
import styled from "../../lib/styled-components";
import PrimaryButtonComponent from "../Button/PrimaryButton";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import { Article_voteResult } from "../../../kauri-web/queries/__generated__/Article";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const VotingCaption = styled.div`
  display: flex;
`;

const VotingButtons = styled.div`
  display: flex;
  > button:last-child {
    margin-left: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  positiveVoteAction: () => void;
  negativeVoteAction: () => void;
  isLoggedIn: boolean;
  voteResult: Article_voteResult;
}

const Component: React.FunctionComponent<IProps> = props => (
  <Container>
    <VotingCaption>
      {props.voteResult.sum} person(s) found this offensive.
    </VotingCaption>
    {props.isLoggedIn && (
      <VotingButtons>
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
      </VotingButtons>
    )}
  </Container>
);

export default Component;
