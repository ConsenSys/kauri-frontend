import React from "react";
import { storiesOf } from "@storybook/react";
import VoteArticle from "../components/VoteArticle";
import { Article_voteResult } from "../../kauri-web/queries/__generated__/Article";
import styled from "styled-components";

const handleAction = () => {
  return;
};

const noVotersVoteResult: Article_voteResult = {
  __typename: "VoteResultDTO",
  count: 0,
  hasVoted: false,
  quantity: {
    1: 0,
    "-1": 0,
  },
  sum: 0,
};

const oneVoterVoteResultHasntVotedAlready: Article_voteResult = {
  __typename: "VoteResultDTO",
  count: 1,
  hasVoted: false,
  quantity: {
    1: 1,
    "-1": 0,
  },
  sum: 1,
};

const votedAlreadyVoteResult: Article_voteResult = {
  __typename: "VoteResultDTO",
  count: 1,
  hasVoted: true,
  quantity: {
    1: 0,
    "-1": 1,
  },
  sum: 0,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

storiesOf("VoteArticle", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("No voters yet, not logged in", () => (
    <VoteArticle
      loginFirstToVote={() => {
        return;
      }}
      positiveVoteAction={handleAction}
      negativeVoteAction={handleAction}
      voteResult={noVotersVoteResult}
      isLoggedIn={false}
    />
  ))
  .add("1 voter already, has not voted yet,not logged in", () => (
    <VoteArticle
      loginFirstToVote={() => {
        return;
      }}
      positiveVoteAction={handleAction}
      negativeVoteAction={handleAction}
      voteResult={oneVoterVoteResultHasntVotedAlready}
      isLoggedIn={false}
    />
  ))
  .add("no voters yet, logged in", () => (
    <VoteArticle
      loginFirstToVote={() => {
        return;
      }}
      positiveVoteAction={handleAction}
      negativeVoteAction={handleAction}
      voteResult={noVotersVoteResult}
      isLoggedIn={true}
    />
  ))
  .add("1 voter already, has not voted yet, logged in", () => (
    <VoteArticle
      loginFirstToVote={() => {
        return;
      }}
      positiveVoteAction={handleAction}
      negativeVoteAction={handleAction}
      voteResult={oneVoterVoteResultHasntVotedAlready}
      isLoggedIn={true}
    />
  ))
  .add("1 voter already, has voted already, logged in", () => (
    <VoteArticle
      loginFirstToVote={() => {
        return;
      }}
      positiveVoteAction={handleAction}
      negativeVoteAction={handleAction}
      voteResult={votedAlreadyVoteResult}
      isLoggedIn={true}
    />
  ));
