import * as React from "react";
import styled from "../../lib/styled-components";
import PrimaryButtonComponent from "../Button/PrimaryButton";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import { Article_voteResult } from "../../../kauri-web/queries/__generated__/Article";
import { H4 } from "../Typography";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const VotingButtons = styled.div`
  display: flex;
  > button:last-child {
    margin-left: ${props => props.theme.space[1]}px;
  }
`;

const VotingCTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  positiveVoteAction: () => void;
  negativeVoteAction: () => void;
  loginFirstToVote: () => void;
  isLoggedIn: boolean;
  voteResult: Article_voteResult;
}

const Component: React.FunctionComponent<IProps> = props => (
  <Container>
    <H4>
      {props.voteResult.count > 0
        ? `${props.voteResult.sum} out of ${
            props.voteResult.count
          } readers found this article helpful.`
        : "No one has reviewed this article yet. Reviews help authors create good content!"}
    </H4>
    {props.isLoggedIn ? (
      props.voteResult.hasVoted ? (
        <H4>Thanks for reviewing!</H4>
      ) : (
        <VotingCTAContainer>
          <H4>{"Was this article helpful?"}</H4>
          <VotingButtons>
            <PrimaryButtonComponent onClick={() => props.positiveVoteAction()}>
              Yes
            </PrimaryButtonComponent>
            <SecondaryButtonComponent
              color="textPrimary"
              border={"primary"}
              borderHover={"hoverTextColor"}
              onClick={() => props.negativeVoteAction()}
            >
              Needs Improvement
            </SecondaryButtonComponent>
          </VotingButtons>
        </VotingCTAContainer>
      )
    ) : (
      <VotingCTAContainer>
        <PrimaryButtonComponent onClick={() => props.loginFirstToVote()}>
          Login to Review
        </PrimaryButtonComponent>
      </VotingCTAContainer>
    )}
  </Container>
);

export default Component;
