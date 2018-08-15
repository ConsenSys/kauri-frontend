// @flow
import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {
  CreateRequestLogo as ApprovedArticleLogo,
  CreateRequestSecondaryHeader as ApprovedArticleSecondaryHeader,
  TopicActionsContainer as ApprovedArticleSubjectContainer,
} from '../../CreateRequestForm/CreateRequestHeader'
import { InReviewArticleStatus as ApprovedArticleStatus } from '../InReviewArticle/InReviewArticleHeader'
import { ChosenCategory, ForVersion } from '../../SubmitArticleForm/SubmitArticleFormHeader'
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
`

export const ArticleChosenCategory = ChosenCategory.extend`
  margin-top: 6px;
  margin-bottom: 5px;
`

const ArticleChosenDetails = styled.div`
  display: flex;
  flex-direction: row;
`

const ArticleChosenSubcategory = ArticleChosenCategory.extend`
  margin-left: 20px;
`

export const ApprovedArticleSubject = ({
  getFieldDecorator,
  chosenCategory,
  chosenSubcategory,
  subject,
  metadata,
  type = 'article',
}: *) => (
  <ApprovedArticleSubjectContainer type={type}>
    <ArticleChosenDetails>
      <ArticleChosenCategory>{chosenCategory || 'Personal'}</ArticleChosenCategory>
      <ArticleChosenSubcategory>{chosenSubcategory}</ArticleChosenSubcategory>
    </ArticleChosenDetails>
    <ArticleSubject style={{ width: '100%' }} type='article'>
      {subject}
    </ArticleSubject>
    {metadata && metadata.FOR_VERSION && <ForVersion>{`FOR VERSION ${metadata && metadata.FOR_VERSION}`}</ForVersion>}
  </ApprovedArticleSubjectContainer>
)

export const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 11px;
  align-items: center;
`

export default ({ category, sub_category, date_updated, subject, metadata }: *) => (
  <ApprovedArticleSecondaryHeader type='article' theme={theme} chosenCategory={category}>
    <ApprovedArticleLogo type='article' theme={theme} chosenCategory={category} />
    <ApprovedArticleSubject
      type='article'
      metadata={metadata}
      subject={subject}
      theme={theme}
      chosenCategory={category}
      chosenSubcategory={sub_category}
    />
    <PullRight>
      <PostedDate dateType='FromNow' date_field={date_updated} />
    </PullRight>
  </ApprovedArticleSecondaryHeader>
)
