import Homepage from "./View.js";
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
