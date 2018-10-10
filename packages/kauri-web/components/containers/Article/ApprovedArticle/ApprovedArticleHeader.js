// @flow
import React from 'react'
import styled from 'styled-components'
import {
  CreateRequestLogo as ApprovedArticleLogo,
  CreateRequestSecondaryHeader as ApprovedArticleSecondaryHeader,
  TopicActionsContainer as ApprovedArticleSubjectContainer,
} from '../../CreateRequestForm/CreateRequestHeader'
import { ForVersion } from '../../SubmitArticleForm/SubmitArticleFormHeader'
import PostedDate from '../../../../../kauri-components/components/Typography/PostedDate.bs'
import theme from '../../../../lib/theme-config'

export const ArticleSubject = styled.h3`
  margin-left: 10px;
  margin-bottom: 0px;
  background: none;
  background-color: transparent;
  color: white;
  font-size: 26px;
  font-weight: 500;
  border: none;
  * {
    border: none;
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 0px;
  }
  margin-left: 0;
`

const ArticleChosenDetails = styled.div`
  display: flex;
  flex-direction: row;
`


export const ApprovedArticleSubject = ({
  getFieldDecorator,
  subject,
  attributes,
  type = 'article',
}: *) => (
  <ApprovedArticleSubjectContainer type={type}>
    <ArticleSubject style={{ width: '100%' }} type='article'>
      {subject}
    </ArticleSubject>
    {/* {attributes && attributes.FOR_VERSION && <ForVersion>{`FOR VERSION ${attributes && attributes.FOR_VERSION}`}</ForVersion>} */}
  </ApprovedArticleSubjectContainer>
)

export const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 11px;
  align-items: center;
`

export default ({ datePublished, title, attributes }: *) => (
  <ApprovedArticleSecondaryHeader style={{ background: attributes && attributes.background ? `url(${attributes.background}) center center` : '#1E2428', backgroundSize: 'cover'}} type='article' theme={theme}>
    <ApprovedArticleSubject
      type='article'
      attributes={attributes}
      subject={title}
      theme={theme}
    />
    <PullRight>
      <PostedDate dateType='FromNow' date_field={datePublished} />
    </PullRight>
  </ApprovedArticleSecondaryHeader>
)
