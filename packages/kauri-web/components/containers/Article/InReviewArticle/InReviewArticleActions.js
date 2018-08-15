// @flow
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { ActionBadge, ActionIcon } from '../../../common/ActionBadge'
import GreenArrow from '../../../common/GreenArrow'

const InReviewArticleActions = styled.section`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.secondaryColor};
  padding: 36px ${props => props.theme.padding};
  justify-content: center;
  align-items: center;
  > :last-child {
    margin-right: 11px;
  }
`

const PullRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > :last-child {
    margin-right: 0px;
  }
`

const Middle = styled.div`
  margin: 0 auto;
  margin-left: 455px;
`

export default ({
  toggleBanner,
  routeChangeAction,
  tipArticleAction,
  ethUsdPrice,
  request_id,
  status,
  tip,
  isTopicOwner,
  isContributor,
  updateUnsubmittedArticle,
  publishArticle,
  approveArticle,
  rejectArticle,
  preApproveArticle,
}: *) => (
  <InReviewArticleActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction='left' />
      <span>Go Back</span>
    </ActionBadge>
    <Middle>
      {status === 'IN_REVIEW' &&
        isTopicOwner && (
          <ActionBadge onClick={approveArticle}>
            <ActionIcon />
            <strong>APPROVE ARTICLE</strong>
          </ActionBadge>
        )}
      {/* TODO: PUBLISH ARTICLE DIRECTLY IF CONTRIBUTOR + TOPIC OWNER */}
      {status === 'APPROVED' &&
        isContributor && (
          <ActionBadge onClick={publishArticle}>
            <ActionIcon />
            <strong>{'PUBLISH ARTICLE'}</strong>
          </ActionBadge>
        )}
    </Middle>
    <PullRight>
      {(status === 'IN_REVIEW' || status === 'DRAFT') &&
        isContributor && (
          <ActionBadge onClick={updateUnsubmittedArticle}>
            <ActionIcon />
            <strong>UPDATE ARTICLE</strong>
          </ActionBadge>
        )}
      {status === 'IN_REVIEW' &&
        isTopicOwner && (
          <ActionBadge onClick={rejectArticle}>
            <ActionIcon />
            <strong>REJECT ARTICLE</strong>
          </ActionBadge>
        )}
    </PullRight>
  </InReviewArticleActions>
)
