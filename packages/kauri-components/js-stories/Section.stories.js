// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import Stack from 'stack-styled'
import styled from 'styled-components'
import { space } from 'styled-system'
import PrimaryHeaderSection from '../components/Section/PrimaryHeaderSection'
import ActionsSection from '../components/Section/ActionsSection'
import { AddTagButton, PrimaryButton, TertiaryButton } from '../components/Button'
import ProfileHeaderLabel from '../components/PublicProfile/ProfileHeaderLabel.bs'
import StatisticsContainer from '../components/PublicProfile/StatisticsContainer.bs'
import UserWidgetSmall from '../components/UserWidget/UserWidgetSmall.bs'
import CuratorHeaderLabel from '../components/Typography/CuratorHeaderLabel'
import Input from '../components/Input/Input'
import AddMemberButton from '../components/Button/AddMemberButton';

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

const CreateCollectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    ${space};
  }
`

const CreateCollectionActionsPlaceHolder = styled.div`
  display: flex;
  mix-blend-mode: normal;
  opacity: 0.2;
  cursor: initial !important;
  > * {
    ${space};
    cursor: initial !important;
  }
`

const CreateCollectionMetaDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    ${space};
  }
`

const CreateCollectionCuratorDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    ${space};
  }
`

const CreateCollectionCurators = styled.div`
  display: flex;
  align-items: center;
  > * {
    ${space};
  }
`

storiesOf('Section', module)
  .add('ActionsSection', () => (
    <ActionsSection>
      <Stack alignItems={['', 'center']} >
        <TertiaryButton icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
      </Stack>
      <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
        <TertiaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Background Image</TertiaryButton>
      </Stack>
      <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
        <PrimaryButton>Create</PrimaryButton>
      </Stack>
    </ActionsSection>
  ))
  .add('PrimaryHeaderSection', () => (
    <PrimaryHeaderSection>
      <CreateCollectionDetails mb={2}>
        <ProfileHeaderLabel header='Collection' />
        <Input placeHolder='Add collection title' fontSize={5} />
        <Input placeHolder='Add description' fontSize={3} />
        <AddTagButton color='white' />
        <CreateCollectionActionsPlaceHolder mr={3}>
          <PrimaryButton>Follow Collection</PrimaryButton>
          <TertiaryButton>Up vote</TertiaryButton>
          <TertiaryButton>Share</TertiaryButton>
        </CreateCollectionActionsPlaceHolder>
      </CreateCollectionDetails>
      <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
        <CreateCollectionMetaDetails mb={4}>
          <StatisticsContainer
            pageType='CollectionPage'
            statistics={
              [
                { 'name': 'Followers', 'count': 0 },
                { 'name': 'Articles', 'count': 0 },
                { 'name': 'Views', 'count': 0 },
                { 'name': 'Upvotes', 'count': 0 },
              ]
            }
          />
          <CreateCollectionCuratorDetails mb={2}>
            <CuratorHeaderLabel>Curator</CuratorHeaderLabel>
            <CreateCollectionCurators mr={3}>
              <UserWidgetSmall color='FFFFFF' username={'davodesign84'} />
              <AddMemberButton />
            </CreateCollectionCurators>
          </CreateCollectionCuratorDetails>
        </CreateCollectionMetaDetails>
      </Stack>
    </PrimaryHeaderSection>
  ))
