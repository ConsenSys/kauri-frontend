import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import UpdateRequestForm from "../components/containers/CreateRequestForm";
import { withRouter } from "next/router";

class UpdateRequest extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <UpdateRequestForm request_id={this.props.router.query["request_id"]} />
      </AppWithoutNavbar>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withRouter
)(UpdateRequest);
