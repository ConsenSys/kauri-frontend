import * as React from "react";
import styled from "../../lib/styled-components";
import { Article_voteResult } from "../../../kauri-web/queries/__generated__/Article";
import { Label } from "../Typography";
import TertiaryButtonComponent from "../Button/TertiaryButton";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  justify-content: center;
  align-items: center;
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

const HeartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="18" height="18" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.01)" />
      </pattern>
      <image
        id="image0"
        width="100"
        height="100"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const SadFaceIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="18" height="18" fill="url(#pattern1)" />
    <defs>
      <pattern
        id="pattern1"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image1" transform="scale(0.01)" />
      </pattern>
      <image
        id="image1"
        width="100"
        height="100"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

interface IProps {
  positiveVoteAction: () => void;
  negativeVoteAction: () => void;
  loginFirstToVote: () => void;
  isLoggedIn: boolean;
  voteResult: Article_voteResult;
}

const Component: React.FunctionComponent<IProps> = props => (
  <Container>
    <Label>{"Was this article helpful?"}</Label>
    {
      <VotingCTAContainer>
        <VotingButtons>
          <TertiaryButtonComponent
            disabled={Boolean(props.voteResult.hasVoted)}
            color={"textPrimary"}
            onClick={() =>
              props.isLoggedIn
                ? props.positiveVoteAction()
                : props.loginFirstToVote()
            }
            icon={<HeartIcon />}
          >
            {`Yes (${props.voteResult.sum})`}
          </TertiaryButtonComponent>
          <TertiaryButtonComponent
            disabled={Boolean(props.voteResult.hasVoted)}
            icon={<SadFaceIcon />}
            color="textPrimary"
            onClick={() =>
              props.isLoggedIn
                ? props.negativeVoteAction()
                : props.loginFirstToVote()
            }
          >
            {`Needs improvement (${props.voteResult.sum})`}
          </TertiaryButtonComponent>
        </VotingButtons>
      </VotingCTAContainer>
    }
    {props.voteResult.hasVoted && <Label>Thanks for reviewing!</Label>}
  </Container>
);

export default Component;
