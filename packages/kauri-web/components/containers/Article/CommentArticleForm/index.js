// @flow
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { showNotificationAction } from '../../../../lib/Module'
import { addCommentAction } from './Module'
import View from './View';
import { routeChangeAction } from '../../../../lib/Module';
import { withRouter } from 'next/router'

const mapStateToProps = (state, ownProps) => ({
  userId: state.app && state.app.user && state.app.user.id,
  personalUsername: state.app && state.app.user && state.app.user.name,
})

export type FormState = {
  body: string
}

export default compose(
  connect(
    mapStateToProps,
    { showNotificationAction, addCommentAction, routeChangeAction }
  ),
  withFormik({
    mapPropsToValues: ({ id, version }) => ({
      body: '',
    }),
    validationSchema: Yup.object().shape({
      body: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
    }),
    handleSubmit: (values: FormState, { props, setErrors, resetForm, setSubmitting }) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(values)
        console.log(props)
      }
      const { addCommentAction } = props

      const payload = { ...values, parent: { type: 'ARTICLE', id: props.id, version: props.version } }

      addCommentAction(payload, () => {
        setSubmitting(false)
        resetForm()
      })
    },
  })
)(withRouter(View))
