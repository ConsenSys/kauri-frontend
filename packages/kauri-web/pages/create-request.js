import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import CreateRequestForm from "../components/containers/CreateRequestForm";
import { Helmet } from "react-helmet";
import { withRouter } from "next/router";

class CreateRequest extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <Helmet>
          <title>Create Request</title>
        </Helmet>
        <CreateRequestForm />
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
)(CreateRequest);
