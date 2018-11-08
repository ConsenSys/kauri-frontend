// @flow
import * as React from 'react'
import styled from 'styled-components'
import { space, bg } from 'styled-system'
import { Form, Field, FieldArray } from 'formik'
import Stack from 'stack-styled'
import R from 'ramda'
import ActionsSection from '../../../../kauri-components/components/Section/ActionsSection'
import PrimaryHeaderSection from '../../../../kauri-components/components/Section/PrimaryHeaderSection'
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs'
import UserAvatar from '../../../../kauri-components/components/UserAvatar'
import { Label } from '../../../../kauri-components/components/Typography'
import CuratorHeaderLabel from '../../../../kauri-components/components/Typography/CuratorHeaderLabel'
import Input from '../../../../kauri-components/components/Input/Input'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import TertiaryButton from '../../../../kauri-components/components/Button/TertiaryButton'
import ArticleCard from '../../connections/ArticleCard'
import setImageUploader from '../../common/ImageUploader'
import showFormValidationErrors from '../../../lib/show-form-validation-errors'
import ChooseArticleModal from './ChooseArticleModal'
import CreateCollectionOptions from './CreateCollectionOptions'
// import AddTagButton from '../../../../kauri-components/components/Button/AddTagButton'
// import AddMemberButton from '../../../../kauri-components/components/Button/AddMemberButton'

import type { FormState } from './index'
import type { ShowNotificationPayload } from '../../../lib/Module'

const emptySection: SectionDTO = {
  name: '',
  description: undefined,
  resourcesId: [],
}
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
  margin-bottom: ${props => props.theme.space[2]}px;
`

const ResourceSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${space};
  > button:last-child {
    margin-top: ${props => props.theme.space[1]}px;
  }
`

const SectionSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  :not(:first-child) {
    ${space};
  }
  > button:nth-child(4) {
    margin-top: ${props => props.theme.space[2]}px;
  }
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
  justify-content: center;
  ${space};
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`

const CreateCollectionCurators = styled.div`
  display: flex;
  align-items: center;
`

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

const DisplayFormikState = props => (
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
)

const ErrorMessageRenderer = styled.h2`
  color: #ffffff !important;
`

const ShareIcon = () => (
  <svg role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
    <path
      fill='#0BA986'
      d='M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z'
      className=''
    />
  </svg>
)

const handleBackgroundSetFormField = setFieldValue => () =>
  setImageUploader(payload => {
    setFieldValue('background', payload.background.background)
  }, 'background')

const renderResourceSection = (index, arrayHelpers, section, values, mappingKey) => (resource, resourceIndex) => (
  <ResourceSection key={resourceIndex} mt={3} p={2}>
    {R.path(['sections', index, mappingKey, resourceIndex, 'version'], values) && (
      <div id='article-card'>
        <ArticleCard
          id={R.path(['sections', index, mappingKey, resourceIndex, 'id'], values)}
          version={parseInt(R.path(['sections', index, mappingKey, resourceIndex, 'version'], values))}
          cardHeight={420}
        />
      </div>
    )}
    <TertiaryButton
      color='primaryTextColor'
      icon={<RemoveIcon />}
      onClick={() =>
        arrayHelpers.form.setFieldValue(
          `sections[${index}][${mappingKey}]`,
          Array.isArray(section[mappingKey]) &&
            (!resourceIndex
              ? section[mappingKey].length > 1
                ? section[mappingKey].splice(1)
                : []
              : R.remove(resourceIndex, resourceIndex, section[mappingKey]))
        )
      } // Remove current resource index
    >
      Remove Article
    </TertiaryButton>
  </ResourceSection>
)

type Props = {
  userId: string,
  touched: {
    name: boolean,
    description: boolean,
  },
  errors: {
    name: ?string,
    description: ?string,
  },
  values: FormState,
  isSubmitting: boolean,
  setFieldValue: (string, any) => void,
  validateForm: () => Promise<any>,
  showNotificationAction: ShowNotificationPayload => void,
  routeChangeAction: string => void,
  data?: { getCollection?: ?CollectionDTO },
  openModalAction: ({ children: React.Node }) => void,
  closeModalAction: () => void,
  userId: string,
  username: string,
  userAvatar: string,
}

const BackIcon = styled.div`
  width: 10px !important;
  height: 14px !important;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 10px solid ${props => props.theme.colors['primary']};
`

export default ({
  touched,
  errors,
  values,
  isSubmitting,
  setFieldValue,
  validateForm,
  showNotificationAction,
  routeChangeAction,
  data,
  openModalAction,
  closeModalAction,
  username,
  userId,
  userAvatar,
}: Props) => (
  <Section>
    <Form>
      <ActionsSection bg={(typeof values.background === 'string' && 'transparent') || 'bgPrimary'}>
        <Stack alignItems={['', 'center']}>
          <TertiaryButton onClick={() => routeChangeAction('back')} icon={<BackIcon />}>
            Cancel Collection
          </TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
          <TertiaryButton icon={<UploadIcon />} handleClick={handleBackgroundSetFormField(setFieldValue)}>
            Background Image
          </TertiaryButton>
        </Stack>
        <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
          <PrimaryButton
            disabled={isSubmitting}
            type='submit'
            onClick={() => showFormValidationErrors(validateForm, showNotificationAction)}
          >
            {data ? 'Update' : 'Create'}
          </PrimaryButton>
        </Stack>
      </ActionsSection>

      <PrimaryHeaderSection backgroundURL={values.background}>
        <CreateCollectionDetails mb={2}>
          <Label color='white'>Collection</Label>
          <Field
            type='text'
            name='name'
            render={({ field }) => <Input {...field} type='text' placeHolder='Add collection title' fontSize={7} />}
          />
          {/* <ErrorMessage name='name' render={(message: string) => <ErrorMessageRenderer>{message}</ErrorMessageRenderer>} /> */}
          <Field
            type='text'
            name='description'
            render={({ field }) => <Input {...field} type='text' placeHolder='Add description' fontSize={4} />}
          />
          {/* <ErrorMessage name='description' render={(message: string) => <ErrorMessageRenderer>{message}</ErrorMessageRenderer>} /> */}

          {/* TODO: WAIT FOR BACKEND */}
          {/* <AddTagButton color='white' /> */}
          <CreateCollectionActionsPlaceHolder mr={3}>
            {/* <PrimaryButton>Follow Collection</PrimaryButton> */}
            {/* <TertiaryButton>Up vote</TertiaryButton> */}
            <TertiaryButton icon={<ShareIcon />}>Share</TertiaryButton>
          </CreateCollectionActionsPlaceHolder>
        </CreateCollectionDetails>
        <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
          <CreateCollectionMetaDetails mb={4}>
            <CreateCollectionCuratorDetails mr={4} mb={2}>
              <StatisticsContainer
                pageType='CollectionPage'
                statistics={[
                  // { name: 'Followers', count: 0 },
                  {
                    name: 'Articles',
                    count: R.pipe(R.reduce((current, next) => current + next['resourcesId'].length, 0))(
                      values.sections
                    ),
                  },
                  // { name: 'Views', count: 0 },
                  // { name: 'Upvotes', count: 0 },
                ]}
              />
              <CuratorHeaderLabel>Curator</CuratorHeaderLabel>
              <CreateCollectionCurators>
                <UserAvatar variant='white' fullWidth username={username} userId={userId} avatar={userAvatar} />
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
            <React.Fragment>
              {/* {console.log(arrayHelpers)} */}
              {values.sections &&
                values.sections.length > 0 &&
                values.sections.map((section: SectionDTO, index) => (
                  <SectionSection key={index} mt={4}>
                    <Field
                      type='text'
                      name={`sections.${index}.name`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type='text'
                          placeHolder='Section Name'
                          fontSize={5}
                          fontWeight={500}
                          color={'primaryTextColor'}
                          hideUnderline
                          textAlign={'center'}
                        />
                      )}
                    />
                    <Field
                      type='text'
                      name={`sections.${index}.description`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type='text'
                          placeHolder='Section description'
                          fontSize={2}
                          fontWeight={300}
                          color={'primaryTextColor'}
                          hideUnderline
                          textAlign={'center'}
                        />
                      )}
                    />

                    <ResourcesSection>
                      {section.resourcesId &&
                        Array.isArray(section.resourcesId) &&
                        section.resourcesId.map(
                          renderResourceSection(index, arrayHelpers, section, values, 'resourcesId')
                        )}
                    </ResourcesSection>

                    <CreateCollectionOptions
                      currentSectionIndex={index}
                      previousSectionHasArticles={R.pipe(
                        R.path(['sections', index > 0 ? index : 0, 'resourcesId']),
                        R.defaultTo([]),
                        resourcesId => resourcesId.length
                      )(values)}
                      addNewSection={() => arrayHelpers.push(emptySection)}
                      removeSection={() => arrayHelpers.remove(index)}
                      chooseArticle={() =>
                        openModalAction({
                          children: (
                            <ChooseArticleModal
                              chosenArticles={R.path(['sections', index, 'resourcesId'])(values)}
                              closeModalAction={() => closeModalAction()}
                              confirmModal={chosenArticles =>
                                arrayHelpers.form.setFieldValue(
                                  `sections[${index}].resourcesId`,
                                  chosenArticles.map(article => ({ ...article, type: 'ARTICLE' }))
                                )
                              }
                            />
                          ),
                        })
                      }
                    />
                  </SectionSection>
                ))}
            </React.Fragment>
          )}
        />

        {/* <DisplayFormikState touched={touched} errors={errors} values={values} isSubmitting={isSubmitting} /> */}
      </ContentSection>
    </Form>
  </Section>
)
