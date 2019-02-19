import React from "react";
import { storiesOf } from "@storybook/react";
import VoteArticle from "../components/VoteArticle";
import { Article_voteResult } from "../../kauri-web/queries/__generated__/Article";

const handleAction = () => {
  return;
};

const noVotersVoteResult: Article_voteResult = {
  __typename: "VoteResultDTO",
  count: 0,
  hasVoted: false,
  sum: 0,
};

const oneVoterVoteResultHasntVotedAlready: Article_voteResult = {
  __typename: "VoteResultDTO",
  count: 1,
  hasVoted: false,
  sum: 1,
};

const votedAlreadyVoteResult: Article_voteResult = {
  __typename: "VoteResultDTO",
  count: 1,
  hasVoted: true,
  sum: 0,
};

storiesOf("VoteArticle", module)
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
