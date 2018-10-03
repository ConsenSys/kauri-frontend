// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Label, CTA, BodyCard } from '../../../../../kauri-components/components/Typography'
import UserWidgetSmall from '../../../../../kauri-components/components/UserWidget/UserWidgetSmall.bs'
import CommentArticleForm from '../CommentArticleForm'
import Link from '../../Link'
import userIdTrim from '../../../../lib/userid-trim'

const ApprovedArticleCommentsSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  padding-top: 0px;
  @media(max-width: 950px) {
    display: none;
  }
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
`

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`

const Divider = styled.div`
  width: ${props => props.width || '950px'};
  background-color: ${props => props.theme.colors['divider']};
  height: 2px;
  margin-bottom: ${props => props.theme.space[5]}px;
  @media(max-width: 950px) {
    width: 100%;
  }
`

const Comment = ({ body, posted, authorId, author: { name, id } }: CommentDTO) =>
  <CommentContainer>
    <Link useAnchorTag href={`/public-profile/${id}`}>
      <UserWidgetSmall username={name || userIdTrim(id)} />
    </Link>
    <BodyCard>
      {body}
    </BodyCard>
    <MetaDetails>
      <Label>{moment(posted).fromNow()}</Label>
      {/* <CTA>Reply</CTA> */}
    </MetaDetails>
  </CommentContainer>

type Props = {
  comments: ?Array<CommentDTO>,
  id: string,
  version: number
}

export default ({ id, version, comments }: Props) =>
  <ApprovedArticleCommentsSection>
    <Divider />
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
