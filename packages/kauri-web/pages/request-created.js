import React from "react";
import { connect } from "react-redux";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import RequestCreated from "../components/containers/RequestCreated";
import { withRouter } from "next/router";

class RequestCreatedPage extends React.Component {
  render() {
    return (
      <App confirmationPage url={this.props.router}>
        <RequestCreated
          request_id={
            this.props.router.query && this.props.router.query["request_id"]
          }
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(RequestCreatedPage);
