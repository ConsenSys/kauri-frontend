// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Label, CTA, BodyCard } from '../../../../../kauri-components/components/Typography'
import UserWidgetSmall from '../../../../../kauri-components/components/UserWidget/UserWidgetSmall.bs'
import InReviewArticleGeneralCommentForm from '../../Article/InReviewArticle/InReviewArticleGeneralCommentForm'
import CommentArticleForm from '../CommentArticleForm'

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

const Comment = () =>
  <CommentContainer>
    <UserWidgetSmall username='0xabcd...hi' />
    <BodyCard>
   Nullam consectetur aliquam nunc et vehicula.
   Phasellus porta est id vehicula ullamcorper.
   Quisque efficitur lacus ac faucibus luctus.
   Donec non erat varius, suscipit nisl et, semper arcu.
   Nunc non ante at neque imperdiet sollicitudin.
   Duis tincidunt turpis ac urna consectetur eleifend.
   Curabitur tempor sagittis efficitur.
    </BodyCard>
    <MetaDetails>
      <Label>1 day ago</Label>
      <CTA>Reply</CTA>
    </MetaDetails>
  </CommentContainer>

type Props = {
  comments: ?Array<CommentDTO>,
  id: string,
  version: number
}

export default ({ id, version, addCommentAction, comments }: Props) =>
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
      <CommentArticleForm />
    </Content>
  </ApprovedArticleCommentsSection>
