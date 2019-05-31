import View from "./View";
import { connect } from "react-redux";
import { routeChangeAction, IReduxState } from "../../../lib/Module";

const mapStateToProps = (state: IReduxState) => ({
  user: state.app.user,
  userId: state.app.user && state.app.user.id,
});

export default connect(
  mapStateToProps,
  { routeChangeAction }
)(View);
