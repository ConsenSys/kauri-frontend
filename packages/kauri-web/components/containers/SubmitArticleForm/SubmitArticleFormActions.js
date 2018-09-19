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
  background-color: ${props => props.theme.primaryTextColor};
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
  category?: string,
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
      <PositiveRequestActionBadge type='secondary' action={handleSubmit('draft')}>
        <span>Save draft</span>
      </PositiveRequestActionBadge>
      <PositiveRequestActionBadge type={'primary'} action={handleSubmit('submit/update')}>
        <span>{authorId !== userId ? 'Publish' : 'Update Article'}</span>
      </PositiveRequestActionBadge>
    </PullRight>
  </SubmitArticleFormActions>
)
