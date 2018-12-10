import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import TermsOfUse from "../components/containers/TermsOfUse";
import { withRouter } from "next/router";

class TermsOfUsePage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <TermsOfUse category={"kauri"} />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(TermsOfUsePage);
