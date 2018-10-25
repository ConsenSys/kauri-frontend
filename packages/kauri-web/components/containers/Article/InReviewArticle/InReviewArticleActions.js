// @flow
import React from 'react'
import styled from 'styled-components'
import { ActionBadge, ActionIcon } from '../../../common/ActionBadge'
import GreenArrow from '../../../common/GreenArrow'
import RejectArticleModal from './RejectArticleModal'

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
  > :not(:first-child) {
    margin-left: auto;
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

export default ({
  toggleBanner,
  routeChangeAction,
  tipArticleAction,
  ethUsdPrice,
  request_id,
  status,
  tip,
  isContributor,
  isOwner,
  updateUnsubmittedArticle,
  publishArticle,
  approveArticle,
  rejectArticle,
  openModalAction,
  closeModalAction,
}: *) => (
  <InReviewArticleActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction='left' />
      <span>Go Back</span>
    </ActionBadge>
    <PullRight>
      {(status === 'IN_REVIEW' || status === 'DRAFT') &&
        isContributor && (
        <ActionBadge onClick={updateUnsubmittedArticle}>
          <ActionIcon />
          <strong>{status === 'DRAFT' ? 'EDIT DRAFT' : 'UPDATE ARTICLE'}</strong>
        </ActionBadge>
      )}
      {status === 'DRAFT' &&
        isContributor && (
        <ActionBadge onClick={publishArticle}>
          <ActionIcon />
          <strong>{'PUBLISH ARTICLE'}</strong>
        </ActionBadge>
      )}
      {status === 'PENDING' &&
        isOwner && (
        <ActionBadge
          onClick={() =>
            openModalAction({
              children: (
                <RejectArticleModal
                  closeModalAction={() => closeModalAction()}
                  confirmModal={cause => rejectArticle(cause)}
                />
              ),
            })
          }
        >
          <ActionIcon />
          <strong>REJECT ARTICLE</strong>
        </ActionBadge>
      )}
      {status === 'PENDING' &&
        isOwner && (
        <ActionBadge onClick={approveArticle}>
          <ActionIcon />
          <strong>APPROVE ARTICLE</strong>
        </ActionBadge>
      )}
    </PullRight>
  </InReviewArticleActions>
)
