// @flow
import React from 'react'
import styled from 'styled-components'
import GreenArrow from '../../common/GreenArrow'
import { ActionBadge } from '../../common/ActionBadge'
import { PositiveRequestActionBadge } from '../../common/ActionButton'

const SubmitArticleFormActions = styled.section`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.secondaryColor};
  padding: 36px ${props => props.theme.padding};
`

const PullRight = styled.div`
  display: flex;
  align-self: center;
  margin-left: auto;
`

type Props = {
  routeChangeAction: string => void,
  handleSubmit: any => void,
  text?: string,
  userId?: string,
  authorId?: string,
  status?: string,
  getFieldValue: string => ?string,
}

export default ({
  routeChangeAction,
  handleSubmit,
  text,
  status,
  getFieldValue,
  category,
  userId,
  authorId,
}: Props) => (
  <SubmitArticleFormActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction={'left'} />
      <span>Cancel Article</span>
    </ActionBadge>
    <PullRight>
      {status !== 'DRAFT' && (
        <PositiveRequestActionBadge type='secondary' action={handleSubmit('draft')}>
          <span>Save as a draft</span>
        </PositiveRequestActionBadge>
      )}

      <PositiveRequestActionBadge
        type={status === 'DRAFT' ? 'secondary' : 'primary'}
        action={handleSubmit('submit/update')}
      >
        <span>
          {text
            ? authorId === userId
              ? `Update ${status === 'DRAFT' ? 'Draft' : 'Article'}`
              : 'Submit for Review'
            : getFieldValue('category')
              ? 'Submit for Review'
              : 'Publish'}
        </span>
      </PositiveRequestActionBadge>

      {status === 'DRAFT' && (
        <PositiveRequestActionBadge type={'primary'} action={handleSubmit('draft')}>
          <span>{userId === authorId && !category ? 'Publish' : 'Submit for review'}</span>
        </PositiveRequestActionBadge>
      )}
    </PullRight>
  </SubmitArticleFormActions>
)
