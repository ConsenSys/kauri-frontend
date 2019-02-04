// @flow
import R from "ramda";
import type { ShowNotificationPayload } from "./Module";

const validateOnSubmit = (
  validateForm: any,
  showNotificationAction: ShowNotificationPayload => void,
  callback: any
) =>
  validateForm().then(errors => {
    const capitalize = s =>
      R.compose(
        R.toUpper,
        R.head
      )(s) + R.tail(s);

    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((errKey, i) =>
        Array.isArray(errors[errKey])
          ? errors[errKey].map(nestedErrors => {
            Object.values(nestedErrors).map(err =>
              showNotificationAction({
                notificationType: "error",
                message: `${capitalize(errKey)} ${i + 1} Validation error!`,
                description: err,
              })
            );
          })
          : showNotificationAction({
            notificationType: "error",
            message: `${capitalize(errKey)} Validation error!`,
            description: errors[errKey],
          })
      );
    } else {
      return typeof callback === "function" && setTimeout(callback, 300);
    }
  });

export default validateOnSubmit;
