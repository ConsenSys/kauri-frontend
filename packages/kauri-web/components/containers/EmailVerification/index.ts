import View from "./View";
import { connect } from "react-redux";
import { compose } from "react-apollo";
import { verifyEmailAction, resendEmailVerificationAction } from "./Module";
import { routeChangeAction } from "../../../lib/Module";

const mapStateToProps = () => ({});

export default compose(
  connect(
    mapStateToProps,
    { verifyEmailAction, resendEmailVerificationAction, routeChangeAction }
  )
)(View);
