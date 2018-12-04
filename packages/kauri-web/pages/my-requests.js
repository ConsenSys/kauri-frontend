import React from "react";
import { graphql, withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import Requests from "../components/containers/Requests";
import { searchRequests } from "../queries/Request";
import { withRouter } from "next/router";

class MyRequests extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  onChange = e => {
    console.log(`radio checked:${e.target.value}`);
  };

  render() {
    return (
      <App url={this.props.router}>
        <h1>My Requests</h1>
        <Requests myRequests />
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
)(MyRequests);
