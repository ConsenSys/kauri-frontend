import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import CollectionCreated from "../components/containers/CollectionCreated";
import { withRouter } from "next/router";

class CollectionCreatedPage extends React.Component {
  render() {
    return (
      <App confirmationPage url={this.props.router}>
        <CollectionCreated type="created" id={this.props.router.query.id} />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(CollectionCreatedPage);
