import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import CommunityCreated from "../components/containers/CommunityCreated";
import { withRouter } from "next/router";

class CommunityUpdatedPage extends React.Component<{ router: any }> {
  render() {
    return (
      <App>
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
