// @flow
import R from 'ramda'
import { ShowNotificationPayload } from './Module'

const validateOnSubmit = (validateForm: any, showNotificationAction: ShowNotificationPayload => void) => validateForm().then(errors => {
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

export default validateOnSubmit
