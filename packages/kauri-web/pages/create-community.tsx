import React from "react";
import { withApollo, compose } from "react-apollo";
import { withRouter } from "next/router";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import CreateCommunityConnection from "../components/connections/CreateCommunity";

class CreateCommunity extends React.Component<{ router: any }> {
  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <CreateCommunityConnection
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
)(CreateCommunity);
