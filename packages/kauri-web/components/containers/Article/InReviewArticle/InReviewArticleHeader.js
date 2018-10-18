// @flow
import React from 'react'
import styled from 'styled-components'
import { CreateRequestSecondaryHeader as InReviewArticleSecondaryHeader } from '../../CreateRequestForm/CreateRequestHeader'
import { ApprovedArticleSubject as InReviewArticleSubject } from '../ApprovedArticle/ApprovedArticleHeader'
import { DatePosted } from '../../../common/DatePosted'
import theme from '../../../../lib/theme-config'

export const InReviewArticleStatus = DatePosted.extend`
  margin-top: 0;
  align-self: center;
  color: #fff;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${props => props.theme.padding};
  z-index: 9;
  width: 100%;
`

const InReviewArticleHeader = styled(InReviewArticleSecondaryHeader)`
  padding-top: 80px;
  padding-bottom: 140px;
  position: relative;
  padding-left: 0;
`

const Overlay = styled.div`
  background: ${props => props.theme && props.theme.colors.bgPrimary};
  opacity: 0.8;
  height: 100%;
  width: 100%;
  position: absolute;
  margin-top: -80px;
`

export default ({ owner, sub_category, status, title, attributes }: *) => (
  <InReviewArticleHeader
    style={{
      background: attributes && attributes.background ? `url(${attributes.background}) center center` : '#1E2428',
      backgroundSize: 'cover',
    }}
    type='article'
    theme={theme}
    chosenCategory={owner && owner.id}
  >
    <Overlay />
    <InfoContainer>
      <InReviewArticleSubject
        type='in review article'
        metadata={attributes}
        subject={title}
        theme={theme}
        chosenCategory={owner && owner.id}
        chosenSubcategory={''}
        attributes={attributes}
      />
    </InfoContainer>
  </InReviewArticleHeader>
)
