// @flow
import React from 'react'
import styled from 'styled-components'
import { ActionButtons, ActionButton } from '../../common/ActionButton'
import { ConfirmationLogoBadge, PossibleActionBadge, PossibleActions } from '../../common/ActionBadge'
import { ConfirmationSubject, Container } from '../RequestCreated/View'
import ArticleBounty from './ArticleBounty'

type Props = {
  data?: { getRequest?: RequestDTO, getArticle?: ArticleDTO },
  routeChangeAction: string => void,
}

const Capitalize = styled.div`
  color: #fff;
  > :first-child {
    text-transform: capitalize;
  }
`

const Statement = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  > :first-child {
    margin-right: 5px;
  }
`

const BountyStatement = Statement.extend`
  margin-bottom: 47px;
`

class ArticleSubmitted extends React.Component<Props> {
  render () {
    const { data, routeChangeAction } = this.props

    return (
      <Container>
        <ConfirmationLogoBadge chosenCategory={data.getArticle.category} confirmationMessage={'Submitted for Review'} />
        <ConfirmationSubject>{data.getArticle.subject}</ConfirmationSubject>
        <Statement>
          <span>Your article is now being reviewed by the</span>
          <Capitalize>
            <span>{data.getArticle.category}</span>
            <span> team for review.</span>
          </Capitalize>
        </Statement>
        <Capitalize>
          <span>{data.getArticle.category}</span>
          <span> can:</span>
        </Capitalize>
        <PossibleActions>
          <PossibleActionBadge
            action='Approved'
            description='Article is ready to be added to the knowledge base after publishing'
          />
          <PossibleActionBadge action='Changes' description='Article requires changes' />
          <PossibleActionBadge action='Rejected' description='Article is not suitable for the knowledgebase' />
        </PossibleActions>
        {typeof data.getArticle.request_id === 'string' && (
          <BountyStatement>
            <span>
              If published, you will be rewarded <ArticleBounty request_id={data.getArticle.request_id} />
            </span>
          </BountyStatement>
        )}
        <ActionButtons>
          <ActionButton
            action={() => routeChangeAction(`/profile?tab=my articles`)}
            height={40}
            width={183}
            label={'My Articles'}
            type='primary'
          />
          {typeof data.getArticle.request_id === 'string' && (
            <ActionButton
              action={() => routeChangeAction(`/request/${data.getArticle.request_id}`)}
              height={40}
              width={183}
              label={'View Request'}
              type='alt'
            />
          )}
        </ActionButtons>
      </Container>
    )
  }
}

export default ArticleSubmitted
