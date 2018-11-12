// @flow
import React from 'react'
import styled from 'styled-components'
import GreenArrow from '../../common/GreenArrow'
import { ActionBadge } from '../../common/ActionBadge'
import { PositiveRequestActionBadge } from '../../common/ActionButton'
import TriggerImageUploader from '../../common/ImageUploader'
import { AddTagButton, PrimaryButton, TertiaryButton } from '../../../../kauri-components/components/Button'
import Stack from 'stack-styled'
const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

const SubmitArticleFormActions = styled.section`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.primaryTextColor};
  padding: 36px ${props => props.theme.padding};
  justify-content: space-between;
  & > div {
    z-index: 10;
  }
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
  getFieldDecorator('attributes')
  TriggerImageUploader(setFieldsValue, 'attributes')
}

export default ({
  routeChangeAction,
  handleSubmit,
  userId,
  author,
  owner,
  status,
  setFieldsValue,
  getFieldDecorator,
}: Props) => (
  <SubmitArticleFormActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction={'left'} />
      <span>Cancel Update</span>
    </ActionBadge>
    <Stack alignItems={['', 'center']} justifyContent={['', 'center']} style={{ alignSelf: 'center' }}>
      <TertiaryButton icon={<UploadIcon />} handleClick={() => setupImageUploader(setFieldsValue, getFieldDecorator)}>
        Upload Background
      </TertiaryButton>
    </Stack>
    <ContainerRow>
      <PositiveRequestActionBadge type='secondary' action={handleSubmit('draft')}>
        <span>Save draft</span>
      </PositiveRequestActionBadge>
      <PositiveRequestActionBadge type={'primary'} action={handleSubmit('submit/update')}>
        <span>{!status || !owner || owner === userId ? 'Publish Article' : 'Propose Update'}</span>
      </PositiveRequestActionBadge>
    </ContainerRow>
  </SubmitArticleFormActions>
)
