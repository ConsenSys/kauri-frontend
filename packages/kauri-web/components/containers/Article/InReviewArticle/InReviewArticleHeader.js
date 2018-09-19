// @flow
import React from 'react'
import styled from 'styled-components'
import {
  CreateRequestLogo as InReviewArticleLogo,
  CreateRequestSecondaryHeader as InReviewArticleSecondaryHeader,
} from '../../CreateRequestForm/CreateRequestHeader'
import { ApprovedArticleSubject as InReviewArticleSubject, PullRight } from '../ApprovedArticle/ApprovedArticleHeader'
import { DatePosted } from '../../../common/DatePosted'
import theme from '../../../../lib/theme-config'

export const InReviewArticleStatus = DatePosted.extend`
  margin-top: 0;
  align-self: center;
  color: #fff;
`

const InReviewHeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  > :last-child {
    margin-left: 23px;
    margin-left: ${props => !props.chosenCategory && '0px'};
  }
  min-width: 70%;
`

export default ({ owner, sub_category, status, title, attributes }: *) => (
  <InReviewArticleSecondaryHeader type='article' theme={theme} chosenCategory={owner && owner.id}>
    {owner && <InReviewArticleLogo type='article' theme={theme} chosenCategory={owner && owner.id} />}
    <InReviewHeaderDetails chosenCategory={owner && owner.id}>
      <InReviewArticleSubject
        type='in review article'
        metadata={attributes}
        subject={title}
        theme={theme}
        chosenCategory={owner && owner.id}
        chosenSubcategory={''}
      />
    </InReviewHeaderDetails>
    <PullRight>
      <InReviewArticleStatus>
        <span>STATUS</span>
        <strong> {typeof status === 'string' && status.replace(/_/g, ' ')}</strong>
      </InReviewArticleStatus>
    </PullRight>
  </InReviewArticleSecondaryHeader>
)
