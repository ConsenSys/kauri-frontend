import React from "react";
import { withApollo, compose } from "react-apollo";
import { withRouter } from "next/router";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import CreateCollectionConnection from "../components/connections/CreateCollection";

class CreateCollection extends React.Component {
  render () {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <CreateCollectionConnection
          query={this.props.router && this.props.router.query}
        />
      </AppWithoutNavbar>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(CreateCollection);
