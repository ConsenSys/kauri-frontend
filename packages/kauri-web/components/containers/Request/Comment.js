// @flow
import React from 'react'
import styled from 'styled-components'
import DescriptionRow from '../Requests/DescriptionRow'
import DatePosted from '../../common/DatePosted'

type CommentType = 'in review article'
type CommentProps = { comment: ?string, posted: string, user: { username: ?string }, type?: CommentType }

const Details = styled.div`
  display: flex;
  flex-direction: row;
  > :first-child {
    margin-right: 14px;
  }
  margin-bottom: 13px;
`

const Username = styled.span`
  color: ${props => props.theme.primaryColor};
  font-size: 12px;
  font-weight: 500;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px;
  margin-top: ${props => props.type && props.type === 'in review article' && '0px'};
`

const Comment = ({ comment, posted, user: { username }, type }: CommentProps) => (
  <Comment.Wrapper type={type}>
    <Comment.Details>
      <Comment.Username>{username || 'Unknown writer'}</Comment.Username>
      <Comment.DatePosted>
        <strong>{posted}</strong>
      </Comment.DatePosted>
    </Comment.Details>
    <DescriptionRow inReviewArticleComment fullText record={{ text: comment }} />
  </Comment.Wrapper>
)

Comment.Wrapper = Wrapper
Comment.DatePosted = DatePosted
Comment.Details = Details
Comment.Username = Username

export default Comment
