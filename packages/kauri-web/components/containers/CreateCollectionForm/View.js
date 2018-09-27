// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { space, bg } from 'styled-system'
import { Form, Field, FieldArray, ErrorMessage } from 'formik'
import Stack from 'stack-styled'
import R from 'ramda'
import ActionsSection from '../../../../kauri-components/components/Section/ActionsSection'
import PrimaryHeaderSection from '../../../../kauri-components/components/Section/PrimaryHeaderSection'
import ProfileHeaderLabel from '../../../../kauri-components/components/PublicProfile/ProfileHeaderLabel.bs'
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs'
import UserWidgetSmall from '../../../../kauri-components/components/UserWidget/UserWidgetSmall.bs'
import CuratorHeaderLabel from '../../../../kauri-components/components/Typography/CuratorHeaderLabel'
import Input from '../../../../kauri-components/components/Input/Input'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton'
import ArticleCard from '../../connections/ArticleCard'
import setImageUploader from '../../common/ImageUploader'
// import AddTagButton from '../../../../kauri-components/components/Button/AddTagButton'
// import AddMemberButton from '../../../../kauri-components/components/Button/AddMemberButton'

import type { FormState } from './index'
import type { CreateCollectionPayload } from './Module'

const emptyArticleResource = { type: 'ARTICLE', id: '', version: undefined }
const emptySection: SectionDTO = { name: '', description: undefined, resourcesId: [emptyArticleResource], resources: undefined }
const AddIcon = () => <img src='https://png.icons8.com/ios-glyphs/50/000000/plus-math.png' />
const RemoveIcon = () => <img src='https://png.icons8.com/windows/50/000000/delete-sign.png' />

const Section = styled.section`
  display: flex;
  flex-direction: column;
`

const ResourcesSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ResourceSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${space};
`

const SectionSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :not(:first-child) { ${space}; }
`

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  min-height: calc(100vh - 270px);
  ${bg};
`

const CreateCollectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    ${space};
  }
`

const AddAnotherSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${space};
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
  setFieldValue: (string, any) => void,
  validateForm: () => Promise<any>,
  showNotificationAction: ({ notificationType: string, message: string, description: string }) => void,
  createCollectionAction: CreateCollectionPayload => void,
  routeChangeAction: string => void
}

const validateOnSubmit = (validateForm, showNotificationAction) => validateForm().then(errors => {
  const capitalize = (s) => R.compose(R.toUpper, R.head)(s) + R.tail(s)

  if (Object.keys(errors).length > 0) {
    Object.keys(errors).map(errKey =>
      showNotificationAction({
        notificationType: 'error',
        message: `${capitalize(errKey)} Validation error!`,
        description: errors[errKey],
      })
    )
  }
})

export default ({ touched, errors, values, isSubmitting, setFieldValue, validateForm, showNotificationAction, routeChangeAction }: Props) =>
  <Section>
    <Form>
      <ActionsSection bg={(typeof values.background === 'string' && 'transparent') || 'bgPrimary'}>
        <Stack alignItems={['', 'center']} >
          <TertiaryButton
            onClick={() => routeChangeAction('back')}
            icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
          <TertiaryButton icon={<UploadIcon />} handleClick={handleBackgroundSetFormField(setFieldValue)}>
            Background Image
          </TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
          <PrimaryButton disabled={isSubmitting} type='submit' onClick={() => validateOnSubmit(validateForm, showNotificationAction)}>Create</PrimaryButton>
        </Stack>
      </ActionsSection>

      <PrimaryHeaderSection backgroundURL={values.background}>
        <CreateCollectionDetails mb={2}>
          <ProfileHeaderLabel header='Collection' />
          <Field type='text' name='name' render={({ field }) => <Input {...field} type='text' placeHolder='Add collection title' fontSize={5} />} />
          {/* <ErrorMessage name='name' render={(message: string) => <ErrorMessageRenderer>{message}</ErrorMessageRenderer>} /> */}
          <Field type='text' name='description' render={(({ field }) => <Input {...field} type='text' placeHolder='Add description' fontSize={3} />)} />
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

      <ContentSection bg='tertiaryBackgroundColor'>
        <FieldArray
          name='sections'
          render={arrayHelpers => (
            <Fragment>
              {/* {console.log(arrayHelpers)} */}
              {values.sections && values.sections.length > 0 && (
                values.sections.map((section: SectionDTO, index) => (
                  <SectionSection key={index} mt={4}>
                    <Field type='text' name={`sections.${index}.name`}
                      render={
                        ({ field }) =>
                          <Input {...field}
                            type='text'
                            placeHolder='Section Name'
                            fontSize={4}
                            fontWeight={300}
                            color={'primaryTextColor'}
                            hideUnderline
                            textAlign={'center'}
                          />
                      }
                    />
                    <Field type='text' name={`sections.${index}.description`}
                      render={
                        ({ field }) =>
                          <Input {...field}
                            type='text'
                            placeHolder='Section description'
                            fontSize={2}
                            fontWeight={300}
                            color={'primaryTextColor'}
                            hideUnderline
                            textAlign={'center'}
                          />
                      }
                    />
                    <TertiaryButton color='primaryTextColor' icon={<RemoveIcon />} onClick={() => arrayHelpers.remove(index)}>
                      Remove section
                    </TertiaryButton>

                    <ResourcesSection>
                      {
                        section && section.resourcesId && Array.isArray(section.resourcesId) && section.resourcesId.map(
                          (resource, resourceIndex) =>
                            <ResourceSection key={resourceIndex} my={3} p={3} mr={3}>
                              {
                                R.path(['sections', index, 'resourcesId', resourceIndex, 'version'], values) &&
                                <div id='article-card'>
                                  <ArticleCard
                                    id={R.path(['sections', index, 'resourcesId', resourceIndex, 'id'], values)}
                                    version={parseInt(R.path(['sections', index, 'resourcesId', resourceIndex, 'version'], values))}
                                    cardHeight={500}
                                  />
                                </div>
                              }
                              <Field type='text' name={`sections[${index}].resourcesId[${resourceIndex}].id`}
                                render={({ field }) => <Input {...field} type='text' color='primaryTextColor' placeHolder='Article ID' fontSize={3} />}
                              />
                              <Field type='text' name={`sections[${index}].resourcesId[${resourceIndex}].version`}
                                render={({ field }) => <Input {...field} type='text' color='primaryTextColor' placeHolder='Article Version' fontSize={3} />}
                              />
                              <TertiaryButton color='primaryTextColor' icon={<RemoveIcon />}
                                onClick={() =>
                                  arrayHelpers.form.setFieldValue(`sections[${index}].resourcesId`,
                                    Array.isArray(section.resourcesId) && (!resourceIndex ? section.resourcesId.splice(1) : R.remove(resourceIndex, resourceIndex, section.resourcesId)))} // Remove current resource index
                              >
                                Remove resource
                              </TertiaryButton>
                            </ResourceSection>
                        )
                      }
                      <TertiaryButton color='primaryTextColor' icon={<AddIcon />} onClick={() => arrayHelpers.form.setFieldValue(`sections[${index}].resourcesId[${values.sections[index].resourcesId.length}]`, emptyArticleResource)}>
                        Add resource
                      </TertiaryButton>
                    </ResourcesSection>

                  </SectionSection>
                ))
              )}
              <AddAnotherSectionContainer mt={4}>
                <TertiaryButton color='primaryTextColor' icon={<AddIcon />} onClick={() => arrayHelpers.push(emptySection)}>
                Add Another section
                </TertiaryButton>
              </AddAnotherSectionContainer>
            </Fragment>
          )}
        />

        {/* <DisplayFormikState touched={touched} errors={errors} values={values} isSubmitting={isSubmitting} /> */}

      </ContentSection>

    </Form>
  </Section>
