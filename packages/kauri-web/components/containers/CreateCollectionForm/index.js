// @flow
import React from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import CreateCollectionForm from './View'

export type FormState = {
  name: string,
  background: ?string;
  description: ?string;
  sections: Array<SectionDTO>,
  // description: string,
}

const emptySection: SectionDTO = { name: '', description: undefined, resourcesId: [{ type: 'ARTICLE', id: '' }], resources: undefined }

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      sections: [
        emptySection,
      ],
      background: undefined,
      description: undefined,
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
    handleSubmit: (values: FormState, { resetForm, setErrors, setSubmitting }) => {
      console.log(values)
      // if (values.email === 'yomi@gmail.io') {
      //   setErrors({ email: 'That email is already taken' })
      // } else {
      //   resetForm()
      // }
      // setSubmitting(false)
    },
  })
)(CreateCollectionForm)
