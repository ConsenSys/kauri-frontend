// @flow
import React from 'react'
import styled from 'styled-components'
import slugify from 'slugify'
import {
  CreateRequestSecondaryHeader as ApprovedArticleSecondaryHeader,
  TopicActionsContainer as ApprovedArticleSubjectContainer,
} from '../../CreateRequestForm/CreateRequestHeader'
import ShareArticle from '../../../../../kauri-components/components/Tooltip/ShareArticle.bs'
import PostedDate from '../../../../../kauri-components/components/Typography/PostedDate.bs'
import { H5 } from '../../../../../kauri-components/components/Typography'
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

export const ApprovedArticleSubject = ({ getFieldDecorator, subject, attributes, type = 'article' }: *) => (
  <ApprovedArticleSubjectContainer type={type}>
    <ArticleSubject style={{ width: '100%' }} type='article'>
      {subject}
    </ArticleSubject>
    {/* {attributes && attributes.FOR_VERSION && <ForVersion>{`FOR VERSION ${attributes && attributes.FOR_VERSION}`}</ForVersion>} */}
  </ApprovedArticleSubjectContainer>
)

const ApproveArticleHeader = styled(ApprovedArticleSecondaryHeader)`
  margin-top: -76px;
  padding-top: 160px;
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
  margin-top: -160px;
`

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: column;
  padding: 0 ${props => props.theme.padding};
  z-index: 9;
`

export const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: ${props => props.theme.space[1]}px;
  align-items: center;
  margin-top: ${props => props.theme.space[2]}px;
  z-index: 9;
`

const MobileShareContainer = styled.div`
  display: none;
  @media (max-width: 500px) {
    display: flex;
  }
  > * {
    color: white;
    > * {
      color: white;
    }
  }
`

export default ({ id, version, datePublished, dateCreated, title, attributes, status, hostName }: *) => (
  <ApproveArticleHeader
    style={{
      background: attributes && attributes.background ? `url(${attributes.background}) center center` : '#1E2428',
      backgroundSize: 'cover',
    }}
    type='article'
    theme={theme}
  >
    <Overlay />
    <InfoContainer>
      <PostedDate dateType='FromNow' date_field={datePublished || dateCreated} />
      <ApprovedArticleSubject type='article' attributes={attributes} subject={title} theme={theme} />
      <MobileShareContainer>
        <ShareArticle
          url={`${hostName.replace(/api\./g, '')}/article/${id}/v${version}/${slugify(title, {
            lower: true,
          })}`}
          title={title}
        />
      </MobileShareContainer>
    </InfoContainer>
    {status !== 'PUBLISHED' && (
      <PullRight>
        <H5 color='white'>{`STATUS ${typeof status === 'string' && status.replace(/_/g, ' ')}`}</H5>
      </PullRight>
    )}
  </ApproveArticleHeader>
)
