// @flow
import React from 'react'
import styled from 'styled-components'
import { Form, Field, FieldArray, ErrorMessage } from 'formik'
import Stack from 'stack-styled'
import { space } from 'styled-system'
import ActionsSection from '../../../../kauri-components/components/Section/ActionsSection'
import PrimaryHeaderSection from '../../../../kauri-components/components/Section/PrimaryHeaderSection'
import ContentSection from '../../../../kauri-components/components/Section/ContentSection'
import ProfileHeaderLabel from '../../../../kauri-components/components/PublicProfile/ProfileHeaderLabel.bs'
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs'
import UserWidgetSmall from '../../../../kauri-components/components/UserWidget/UserWidgetSmall.bs'
import CuratorHeaderLabel from '../../../../kauri-components/components/Typography/CuratorHeaderLabel'
import Input from '../../../../kauri-components/components/Input/Input'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton'
import setImageUploader from '../../common/ImageUploader'
import AddSection from './AddSection'
// import AddTagButton from '../../../../kauri-components/components/Button/AddTagButton'
// import AddMemberButton from '../../../../kauri-components/components/Button/AddMemberButton'

import type { FormState } from './index'

type Props = {
  userId: string,
  touched: {
    name: boolean,
    description: boolean
  },
  errors: {
    name: ?string,
    description: ?string
  },
  values: FormState,
  isSubmitting: boolean,
  setFieldValue: (string, any) => void
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
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

const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0', background: '#f6f8fa', padding: '.5rem' }}>
    <strong>Injected Formik props (the form's state)</strong>
    <div>
      <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
    </div>
    <div>
      <code>values:</code> {JSON.stringify(props.values, null, 2)}
    </div>
    <div>
      <code>isSubmitting:</code> {JSON.stringify(props.isSubmitting, null, 2)}
    </div>
  </div>

const ErrorMessageRenderer = styled.h2`
  color: #ffffff !important;
`

const handleBackgroundSetFormField = (setFieldValue) => () => setImageUploader(
  (payload) => {
    setFieldValue('background', payload.background.background)
  },
  'background'
)

export default ({ touched, errors, values, isSubmitting, setFieldValue }: Props) =>
  <Section>
    <Form>
      <ActionsSection>
        <Stack alignItems={['', 'center']} >
          <TertiaryButton icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
          <TertiaryButton icon={<UploadIcon />} handleClick={handleBackgroundSetFormField(setFieldValue)}>
            Background Image
          </TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
          <PrimaryButton disabled={isSubmitting} type='submit'>Create</PrimaryButton>
        </Stack>
      </ActionsSection>

      <PrimaryHeaderSection>
        <CreateCollectionDetails mb={2}>
          <ProfileHeaderLabel header='Collection' />
          <Field type='text' name='name' render={({ field }) => <Input {...field} type='text' placeHolder='Add collection title' fontSize={5} />} />
          {/* <ErrorMessage name='name' render={(message: string) => <ErrorMessageRenderer>{message}</ErrorMessageRenderer>} /> */}
          <Field type='text' name='description' render={(({ field }) => <Input {...field} placeHolder='Add description' fontSize={3} />)} />
          {/* <ErrorMessage name='description' render={(message: string) => <ErrorMessageRenderer>{message}</ErrorMessageRenderer>} /> */}

          {/* TODO: WAIT FOR BACKEND */}
          {/* <AddTagButton color='white' /> */}
          <CreateCollectionActionsPlaceHolder mr={3}>
            <PrimaryButton>Follow Collection</PrimaryButton>
            {/* <TertiaryButton>Up vote</TertiaryButton> */}
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
                {/* <AddMemberButton /> */}
              </CreateCollectionCurators>
            </CreateCollectionCuratorDetails>
          </CreateCollectionMetaDetails>
        </Stack>
      </PrimaryHeaderSection>
      <ContentSection>
        <AddSection values={values} />
        <DisplayFormikState touched={touched} errors={errors} values={values} isSubmitting={isSubmitting} />
      </ContentSection>

    </Form>
  </Section>
