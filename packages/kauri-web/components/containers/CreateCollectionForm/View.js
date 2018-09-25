// @flow
import React from 'react'
import styled from 'styled-components'
import { Form, Field, FieldArray } from 'formik'
import Stack from 'stack-styled'
import { space } from 'styled-system'
import ActionsSection from '../../../../kauri-components/components/Section/ActionsSection'
import PrimaryHeaderSection from '../../../../kauri-components/components/Section/PrimaryHeaderSection'
import AddTagButton from '../../../../kauri-components/components/Button/AddTagButton'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton'
import AddMemberButton from '../../../../kauri-components/components/Button/AddMemberButton'
import ProfileHeaderLabel from '../../../../kauri-components/components/PublicProfile/ProfileHeaderLabel.bs'
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs'
import UserWidgetSmall from '../../../../kauri-components/components/UserWidget/UserWidgetSmall.bs'
import CuratorHeaderLabel from '../../../../kauri-components/components/Typography/CuratorHeaderLabel'
import Input from '../../../../kauri-components/components/Input/Input'

import type { FormState } from './index'

type Props = {
  userId: string,
  touched: {
    email: boolean
  },
  errors: {
    email: ?string
  }
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px ${props => props.theme.padding};
`

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

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

export default ({ touched, errors }: Props) =>
  <Section>
    <Form>
      <ActionsSection>
        <Stack alignItems={['', 'center']} >
          <TertiaryButton icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
          <TertiaryButton icon={<UploadIcon />} handleClick={() => alert('clicked')}>Background Image</TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
          <PrimaryButton type='submit'>Create</PrimaryButton>
        </Stack>
      </ActionsSection>

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
    </Form>
  </Section>
