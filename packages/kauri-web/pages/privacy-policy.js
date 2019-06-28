import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import PrivacyPolicy from "../components/containers/PrivacyPolicy";
import { withRouter } from "next/router";

class PrivacyPolicyPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <PrivacyPolicy category={"kauri"} />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(PrivacyPolicyPage);
