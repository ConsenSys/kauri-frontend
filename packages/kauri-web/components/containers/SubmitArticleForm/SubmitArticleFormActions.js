// @flow
import React from 'react'
import styled from 'styled-components'
import GreenArrow from '../../common/GreenArrow'
import { ActionBadge } from '../../common/ActionBadge'
import { PositiveRequestActionBadge } from '../../common/ActionButton';
import TriggerImageUploader from '../../common/ImageUploader';

const SubmitArticleFormActions = styled.section`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.primaryTextColor};
  padding: 36px ${props => props.theme.padding};
  justify-content: space-between;
`

const ContainerRow = styled.div`
  display: flex;
  align-self: center;
`

type Props = {
  routeChangeAction: string => void,
  handleSubmit: any => void,
  userId?: string,
  authorId?: string,
}

const setupImageUploader = (setFieldsValue, getFieldDecorator) => {
  getFieldDecorator('background');
  TriggerImageUploader(setFieldsValue);
};

export default ({
  routeChangeAction,
  handleSubmit,
  userId,
  authorId,
  setFieldsValue,
  getFieldDecorator,
}: Props) => (
  <SubmitArticleFormActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction={'left'} />
      <span>Cancel Article</span>
    </ActionBadge>
    <ContainerRow
      onClick={() => setupImageUploader(setFieldsValue, getFieldDecorator)}
      style={{ color: 'white' }}>
        Test
    </ContainerRow>
    <ContainerRow>
      <PositiveRequestActionBadge type='secondary' action={handleSubmit('draft')}>
        <span>Save draft</span>
      </PositiveRequestActionBadge>
      <PositiveRequestActionBadge type={'primary'} action={handleSubmit('submit/update')}>
        <span>{authorId !== userId ? 'Publish' : 'Update Article'}</span>
      </PositiveRequestActionBadge>
    </ContainerRow>
  </SubmitArticleFormActions>
)
