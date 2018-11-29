// @flow
import React from "react";
import styled from "styled-components";
import { Badge } from "../../common/ActionBadge";

const Strip = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
  justify-content: flex-end;
  > :last-child {
    margin-right: 0px;
  }
`;

const CommentBadge = styled(Badge)`
  color: white;
`;

type CommentDetailsProps = {
  comments: number,
  submissions: number,
  inProgress: number,
};

const CommentDetails = ({
  comments,
  submissions,
  inProgress,
}: CommentDetailsProps) => (
  <CommentDetails.Strip>
    <CommentDetails.CommentBadge>
      <strong>{comments}</strong>
      <strong>COMMENTS</strong>
    </CommentDetails.CommentBadge>

    <CommentDetails.CommentBadge>
      <strong>{inProgress}</strong>
      <strong>IN PROGRESS</strong>
    </CommentDetails.CommentBadge>

    <CommentDetails.CommentBadge>
      <strong>{submissions}</strong>
      <strong>SUBMISSIONS</strong>
    </CommentDetails.CommentBadge>
  </CommentDetails.Strip>
);

CommentDetails.Strip = Strip;
CommentDetails.CommentBadge = CommentBadge;

export default CommentDetails;
