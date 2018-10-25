// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Label, BodyCard } from '../../../../../kauri-components/components/Typography'
import UserAvatar from '../../../../../kauri-components/components/UserAvatar'
import CommentArticleForm from '../CommentArticleForm'
import Link from '../../Link'

const ApprovedArticleCommentsSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  padding-top: 0px;
`

const CommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`

const MetaDetails = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`

const Content = styled.div`
  width: 950px;
  @media(max-width: 950px) {
    width: 100%;
    padding: 0px 0.5em;
  }
`

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > span:nth-child(2) {
    white-space: pre;
  }
`

const Divider = styled.div`
  width: ${props => props.width || '950px'};
  background-color: ${props => props.theme.colors['divider']};
  height: 2px;
  margin-top: ${props => !props.noMarginTop && props.theme.space[3]}px;
  margin-bottom: ${props => props.theme.space[3]}px;
  @media(max-width: 950px) {
    width: 100%;
  }
`

const Comment = ({ body, posted, authorId, author }: CommentDTO) =>
  <CommentContainer>
    <Link useAnchorTag href={`/public-profile/${author.id}`}>
      <UserAvatar username={author.name || author.username}
        userId={author.id}
        avatar={author.avatar}
      />
    </Link>
    <BodyCard>
      {body}
    </BodyCard>
    <MetaDetails>
      <Label>{moment(posted).fromNow()}</Label>
      {/* <CTA>Reply</CTA> */}
    </MetaDetails>
    <Divider />
  </CommentContainer>

type Props = {
  comments: ?Array<CommentDTO>,
  id: string,
  version: number,
  userId?: string
}

export default ({ id, version, comments, userId }: Props) =>
  <ApprovedArticleCommentsSection>
    <Divider noMarginTop />
    <Content>
      {Array.isArray(comments) && comments.length > 0 &&
      (
        <CommentsContainer>
          <Label>General Comments</Label>
          {comments.map(Comment)}
        </CommentsContainer>
      )
      }
      <CommentArticleForm id={id} version={version} />
    </Content>
  </ApprovedArticleCommentsSection>
