// @flow
import React from 'react'
import styled from 'styled-components'
import { CreateRequestSecondaryHeader as InReviewArticleSecondaryHeader } from '../../CreateRequestForm/CreateRequestHeader'
import { H5, Title1 } from '../../../../../kauri-components/components/Typography'
import theme from '../../../../lib/theme-config'

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

export const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: ${props => props.theme.space[1]}px;
  margin-top: ${props => props.theme.space[2]}px;
  align-items: center;
  z-index: 9;
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
      <Title1 color='white'>{title}</Title1>
    </InfoContainer>
    <PullRight>
      <H5 color='white'>{`STATUS ${typeof status === 'string' && status.replace(/_/g, ' ')}`}</H5>
    </PullRight>
  </InReviewArticleHeader>
)
