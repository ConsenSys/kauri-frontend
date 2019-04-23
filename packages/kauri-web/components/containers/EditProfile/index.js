import View from "./View.js";
import { connect } from "react-redux";
import { routeChangeAction, showNotificationAction } from "../../../lib/Module";

const mapStateToProps = (state, ownProps) => ({
  userId: state.app.user && state.app.user.id,
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  { routeChangeAction, showNotificationAction }
)(View);
