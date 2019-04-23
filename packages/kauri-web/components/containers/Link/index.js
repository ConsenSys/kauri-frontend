// @flow
import { connect } from "react-redux";
import { compose } from "react-apollo";
import Link from "./View";

export default compose(
  connect(
    () => ({}),
    { routeChangeAction: payload => ({ type: "ROUTE_CHANGE", payload }) }
  )
)(Link);
