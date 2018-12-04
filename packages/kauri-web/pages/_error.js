import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import Error from "../components/containers/Error";
import { withRouter } from "next/router";

class ErrorPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <Error category={"kauri"} />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ErrorPage);
