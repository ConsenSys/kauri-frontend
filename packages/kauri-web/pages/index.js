import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import Homepage from "../components/containers/Homepage";
import { withRouter } from "next/router";

class Index extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <Homepage />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withRouter
)(Index);
