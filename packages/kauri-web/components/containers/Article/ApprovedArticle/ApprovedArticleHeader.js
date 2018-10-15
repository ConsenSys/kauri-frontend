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

const ApproveArticleHeader = styled(ApprovedArticleSecondaryHeader)`
  margin-top: -76px;
  padding-top: 160px;
  padding-bottom: 140px;
  position: relative;
  padding-left: 0;
`;

const Overlay = styled.div`
  background: ${props => props.theme.colors.bgPrimary};
  opacity: 0.8;
  height: 100%;
  width: 100%;
  position: absolute;
  margin-top: -160px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${props => props.theme.padding};
  z-index: 9;
  width: 100%;
`;

export default ({ datePublished, title, attributes }: *) => (
  <ApproveArticleHeader style={{ background: attributes && attributes.background ? `url(${attributes.background}) center center` : '#1E2428', backgroundSize: 'cover'}} type='article' theme={theme}>
    <Overlay />
    <InfoContainer>
      <PostedDate dateType='FromNow' date_field={datePublished} />
      <ApprovedArticleSubject
        type='article'
        attributes={attributes}
        subject={title}
        theme={theme}
      />
    </InfoContainer>
  </ApproveArticleHeader>
)
