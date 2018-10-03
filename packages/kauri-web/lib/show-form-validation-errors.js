// @flow
import R from 'ramda'
import { ShowNotificationPayload } from './Module'

const validateOnSubmit = (validateForm: any, showNotificationAction: ShowNotificationPayload => void, callback: any) => validateForm().then(errors => {
  const capitalize = (s) => R.compose(R.toUpper, R.head)(s) + R.tail(s)

  if (Object.keys(errors).length > 0) {
    return Object.keys(errors).map(errKey =>
      showNotificationAction({
        notificationType: 'error',
        message: `${capitalize(errKey)} Validation error!`,
        description: errors[errKey],
      })
    )
  } else {
    return typeof callback === 'function' && setTimeout(callback, 300)
  }
})

export default validateOnSubmit
