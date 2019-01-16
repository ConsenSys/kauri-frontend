import { compose } from "recompose";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { registerAction } from "./Module.js";
import { showNotificationAction } from "../../../lib/Module";
import View from "./View";

export interface IFormState {
  email: string;
}

const mapStateToProps = () => ({});

const getNetwork = async () =>
  new Promise<{ networkName: string; networkId: number }>((resolve, reject) => {
    (window as any).web3.version.getNetwork((err: Error, netId: string) => {
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

export default compose<any, any>(
  connect(
    mapStateToProps,
    { registerAction, showNotificationAction }
  ),
  withFormik<
    {
      registerAction: typeof registerAction;
      showNotificationAction: typeof showNotificationAction;
    },
    { type: "login" | "register" },
    {}
  >({
    handleSubmit: async (values, { props, resetForm }) => {
      console.log(values);
      console.log(props);
      const { networkName } = await getNetwork();
      if (networkName !== "Kauri Dev" && networkName !== "Rinkeby") {
        return props.showNotificationAction({
          description: "Please switch to the correct Ethereum network!",
          message: "Network error!",
          notificationType: "error",
        });
      }
      console.log("Received values of form: ", values);
      const userId: string =
        (window as any).web3.eth.accounts &&
        (window as any).web3.eth.accounts[0];

      return props.registerAction(
        {
          ...values,
          type: "login",
          userId,
        },
        resetForm
      );
    },
  })
)(View);
