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
  sections: Array<SectionDTO>;
  // description: string,
}

export default compose(
  // withFormik({
  //   mapPropsToValues ({ email, password, newsletter, editor, test }) {
  //     return {
  //       email: email || '',
  //       password: password || '',
  //       newsletter: newsletter || false,
  //       editor: editor || 'atom',
  //       test: test || '',
  //     }
  //   },
  //   validationSchema: Yup.object().shape({
  //     email: Yup.string().email('Email not valid').required('Email is required'),
  //   }),
  //   handleSubmit (values, { resetForm, setErrors, setSubmitting }) {
  //     setTimeout(() => {
  //       if (values.email === 'yomi@gmail.io') {
  //         setErrors({ email: 'That email is already taken' })
  //       } else {
  //         resetForm()
  //       }
  //       setSubmitting(false)
  //     }, 2000)
  //   },
  // })
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      sections: [],
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
    },
  })
)(CreateCollectionForm)
