// @flow
import React from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import Yup from 'yup'
import CreateCollectionForm from './View'

export type FormState = {
  email: string,
  password: string,
  newsletter: boolean,
  editor: string,
  test: string,
}

export default compose(
  withFormik({
    mapPropsToValues ({ email, password, newsletter, editor, test }) {
      return {
        email: email || '',
        password: password || '',
        newsletter: newsletter || false,
        editor: editor || 'atom',
        test: test || '',
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email not valid').required('Email is required'),
    }),
    handleSubmit (values, { resetForm, setErrors, setSubmitting }) {
      setTimeout(() => {
        if (values.email === 'yomi@gmail.io') {
          setErrors({ email: 'That email is already taken' })
        } else {
          resetForm()
        }
        setSubmitting(false)
      }, 2000)
    },
  })
)(CreateCollectionForm)
