import React from "react";
import { withApollo, compose } from "react-apollo";
import { connect } from "react-redux";
import withData from "../lib/with-data";
import App from "../layouts/App";
import Requests from "../components/containers/Requests";
import { withRouter } from "next/router";

class AllRequests extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <App url={this.props.router}>
        <Requests
          categoryQuery={
            this.props.router &&
            this.props.router.query &&
            this.props.router.query.category
          }
        />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withRouter,

  connect(
    state => ({ userId: state.app.userId }),
    {}
  )
)(AllRequests);
