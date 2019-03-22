import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import CommunityCreated from "../components/containers/CommunityCreated";
import { withRouter } from "next/router";

class CommunityUpdatedPage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.router}>
        <CommunityCreated type="updated" id={this.props.router.query.id} />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(CommunityUpdatedPage);
