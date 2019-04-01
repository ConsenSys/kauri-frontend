import View from "./View";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";

const mapStateToProps = ({}, {}) => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  )
)(View);
