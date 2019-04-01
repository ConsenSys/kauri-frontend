// @flow
import { compose } from "recompose";
import { connect } from "react-redux";
import { registerAction } from "./Module.js";
import { showNotificationAction } from "../../../lib/Module";
import { withFormik } from "formik";
import View from "./View.js";

export type FormState = {
  email: string,
};

const mapStateToProps = (state, ownProps) => ({});

export default compose(
  connect(
    mapStateToProps,
    { registerAction, showNotificationAction }
  ),
  withFormik({
    mapPropsToValues: () => ({}),
    handleSubmit: async (
      values: FormState,
      { props, setErrors, resetForm, setSubmitting }
    ) => {
      console.log(props);
      console.log("Received values of form: ", values);
      return props.registerAction({ ...values }, resetForm);
    },
  })
)(View);
