import Homepage from "./View";
import { connect } from "react-redux";
import {
  routeChangeAction,
  setNavcolorOverrideAction,
  showNotificationAction,
} from "../../../lib/Module";
import { emailSubscribeAction } from "../EmailVerification/Module";

const mapStateToProps = (state, ownProps) => {
  return {
    hostName: state.app && state.app.hostName,
    isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
  };
};

export default connect(
  mapStateToProps,
  {
    routeChangeAction,
    setNavcolorOverrideAction,
    emailSubscribeAction,
    showNotificationAction,
  }
)(Homepage);
