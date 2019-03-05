// @flow
import { compose } from "recompose";
import { connect } from "react-redux";
import { registerAction, enablePortis } from "./Module.js";
import { showNotificationAction } from "../../../lib/Module";
import { withFormik } from "formik";
import R from "ramda";
import * as Yup from "yup";
import View from "./View.js";

export type FormState = {
  email: string,
};

const mapStateToProps = (state, ownProps) => ({});

const getNetwork = async () =>
  new Promise((resolve, reject) => {
    if (!window.web3) resolve({ networkId: Number(4), networkName: "Rinkeby" });
    window.web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
      }

      const networkId = netId;
      let networkName;

      switch (netId) {
        case "1":
          networkName = "Mainnet";
          break;
        case "2":
          networkName = "Morden";
          break;
        case "3":
          networkName = "Ropsten";
          break;
        case "4":
          networkName = "Rinkeby";
          break;
        case "42":
          networkName = "Kovan";
          break;
        case "224895":
          networkName = "Kauri Dev";
          break;
        default:
          networkName = "Unknown";
      }

      resolve({ networkId: Number(networkId), networkName });
    });
  });

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
      console.log(values);
      console.log(props);
      const { networkName } = await getNetwork();
      if (networkName !== "Kauri Dev" && networkName !== "Rinkeby") {
        return props.showNotificationAction({
          notificationType: "error",
          message: "Network error!",
          description: "Please switch to the correct Ethereum network!",
        });
      }
      console.log("Received values of form: ", values);
      return props.registerAction(
        {
          ...values,
          type: "login",
        },
        resetForm
      );
    },
  })
)(View);
