// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import CreateCollectionForm from './View'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { closeModalAction, openModalAction } from '../../../../kauri-components/components/Modal/Module'
import { createCollectionAction, editCollectionAction, composeCollectionAction } from './Module'
import R from 'ramda'

export type FormState = {
  name: string,
  background?: string,
  description: ?string,
  sections: Array<SectionDTO>,
}

const emptySection: SectionDTO = {
  name: '',
  description: undefined,
  resourcesId: [],
}

const getCollectionField = (field, data) => R.path(['getCollection', field], data)

export default compose(
  connect(
    state => ({
      userId: state.app && state.app.user.id,
      username: state.app && state.app.user.username,
      userAvatar: state.app && state.app.user.avatar,
    }),
    {
      showNotificationAction,
      createCollectionAction,
      editCollectionAction,
      composeCollectionAction,
      routeChangeAction,
      openModalAction,
      closeModalAction,
    }
  ),
  withFormik({
    mapPropsToValues: ({ data }) => ({
      name: getCollectionField('name', data) || '',
      sections: R.path(['getCollection', 'sections'])(data)
        ? R.pipe(
          R.path(['getCollection', 'sections']),
          R.map(section => ({
            ...section,
            resourcesId: R.map(({ id, version }) => ({ type: 'ARTICLE', id, version }))(section.resources),
          })),
          R.map(section => R.dissocPath(['resources'])(section)),
          R.map(section => R.dissocPath(['__typename'])(section))
        )(data)
        : [emptySection],
      background: getCollectionField('background', data) || undefined,
      description: getCollectionField('description', data) || undefined,
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    }),
    handleSubmit: (values: FormState, { props, setErrors, resetForm, setSubmitting }) => {
      const logIfDevelopment = value => process.env.NODE_ENV === 'development' && console.log(value)
      logIfDevelopment(values)
      logIfDevelopment(props)

      if (props.data) {
        // BACKEND FIX sections.resources -> sections.resourcesId :(
        const reassignResourcesToResourcesId = R.pipe(
          R.path(['sections']),
          R.map(section => ({
            ...section,
            resourcesId: R.map(({ id, version }) => ({ type: 'ARTICLE', id, version }))(section.resourcesId),
          })),
          R.map(section => R.dissocPath(['resources'])(section)),
          R.map(section => R.dissocPath(['__typename'])(section))
        )

        logIfDevelopment(reassignResourcesToResourcesId(values))

        const payload = {
          ...values,
          sections: reassignResourcesToResourcesId(values),
          id: props.data.getCollection.id,
          updating: true,
        }

        logIfDevelopment(payload)

        props.editCollectionAction(payload, () => {
          setSubmitting(false)
        })
      } else {
        props.createCollectionAction(values, () => {
          setSubmitting(false)
        })
      }
    },
  })
)(CreateCollectionForm)
