// @flow
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import View from './View'

const mapStateToProps = (state, ownProps) => ({
  userId: state.app && state.app.user && state.app.user.id,
  personalUsername: state.app && state.app.user && state.app.user.name,
})

export type FormState = {
  id: string,
  version: string,
  body: string
}

export default compose(
  connect(
    mapStateToProps,
    { }
  ),
  withFormik({
    mapPropsToValues: ({ id, version }) => ({
      // heh heh pre-populate id and version from data
      id,
      version,
      body: '',
    }),
    validationSchema: Yup.object().shape({
      body: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    }),
    handleSubmit: (values: FormState, { props, setErrors, resetForm, setSubmitting }) => {
      console.log(values)
      console.log(props)
      const { addCommentAction } = props

      addCommentAction(values, () => {
        setSubmitting(false)
      })
    },
  })
)(View)
