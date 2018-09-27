// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import CreateCollectionForm from './View'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { createCollectionAction } from './Module'
import R from 'ramda'

export type FormState = {
  name: string,
  background: ?string;
  description: ?string;
  sections: Array<SectionDTO>,
  // description: string,
}

const emptyArticleResource = { type: 'ARTICLE', id: '', version: undefined }

const emptySection: SectionDTO = {
  name: '',
  description: undefined,
  resourcesId: [
    emptyArticleResource,
  ],
  resources: undefined }

const getCollectionField = (field, data) => R.path(['getCollection', field], data)

export default compose(
  connect(() => ({}), { showNotificationAction, createCollectionAction, routeChangeAction }),
  withFormik({
    mapPropsToValues: ({ data }) => ({
      name: getCollectionField('name', data) || '',
      sections: getCollectionField('sections', data) || [
        emptySection,
      ],
      background: getCollectionField('background', data) || undefined,
      description: getCollectionField('description', data) || undefined,
      // description: '',
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
      console.log(values)
      console.log(props)
      props.createCollectionAction(values, () => {
        setSubmitting(false)
      })
    },
  })
)(CreateCollectionForm)
