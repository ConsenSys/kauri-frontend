import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import Request from "../components/containers/Request";
import { withRouter } from "next/router";

class RequestPage extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <App url={this.props.router}>
        <Request request_id={this.props.router.query["request_id"]} />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withApollo,
  withRouter
)(RequestPage);
