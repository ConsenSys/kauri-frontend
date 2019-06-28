import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import Community from "../components/containers/Community";
import { withRouter } from "next/router";

class CommunityPage extends React.Component {
  render() {
    return (
      <App url={this.props.router} navcolor="transparent" headerOffset={true}>
        <Community
          secret={this.props.router && this.props.router.query.secret}
          communityId={this.props.router && this.props.router.query.communityId}
        />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withApollo,
  withRouter
)(CommunityPage);
