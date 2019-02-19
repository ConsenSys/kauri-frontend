import * as React from "react";
import styled from "../../lib/styled-components";
import PrimaryButtonComponent from "../Button/PrimaryButton";
import SecondaryButtonComponent from "../Button/SecondaryButton";
import { Article_voteResult } from "../../../kauri-web/queries/__generated__/Article";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const VotingCTA = styled.div`
  display: flex;
`;

const VotingCaption = styled.div`
  display: flex;
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
    <VotingCaption>
      {props.voteResult.count > 0
        ? `${props.voteResult.sum} out of ${
            props.voteResult.count
          } readers found this article helpful.`
        : "No one has reviewed this article yet. Reviews help authors create good content!"}
    </VotingCaption>
    {props.isLoggedIn ? (
      props.voteResult.hasVoted ? (
        <VotingCaption>Thanks for reviewing!</VotingCaption>
      ) : (
        <VotingCTAContainer>
          <VotingCTA>{"Was this article helpful?"}</VotingCTA>
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
