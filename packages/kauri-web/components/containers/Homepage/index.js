import Homepage from "./View";
import { connect } from "react-redux";
import {
  routeChangeAction,
  setNavcolorOverrideAction,
} from "../../../lib/Module";

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName };
};

export default connect(
  mapStateToProps,
  { routeChangeAction, setNavcolorOverrideAction }
)(Homepage);
