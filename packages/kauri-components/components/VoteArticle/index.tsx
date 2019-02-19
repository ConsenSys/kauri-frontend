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
  isLoggedIn: boolean;
  voteResult: Article_voteResult;
}

const Component: React.FunctionComponent<IProps> = props => (
  <Container>
    <VotingCaption>
      {props.voteResult.count &&
        `${props.voteResult.sum} out of ${
          props.voteResult.count
        } readers found this article helpful.`}
    </VotingCaption>
    {props.isLoggedIn &&
      (!props.voteResult.hasVoted ? (
        <VotingCaption>
          Thanks for your vote, the community really benefits!
        </VotingCaption>
      ) : (
        <VotingCTAContainer>
          <VotingCTA>{"Was this article helpful?"}</VotingCTA>
          <VotingButtons>
            <PrimaryButtonComponent onClick={() => props.positiveVoteAction()}>
              Yes!
            </PrimaryButtonComponent>
            <SecondaryButtonComponent
              color="textPrimary"
              border={"primary"}
              borderHover={"hoverTextColor"}
              onClick={() => props.negativeVoteAction()}
            >
              It needs improvement
            </SecondaryButtonComponent>
          </VotingButtons>
        </VotingCTAContainer>
      ))}
  </Container>
);

export default Component;
