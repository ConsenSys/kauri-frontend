import React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import withData from "../lib/with-data";
import App from "../layouts/App";
import { routeChangeAction } from "../lib/Module";
import PublicProfile from "../components/containers/PublicProfile";
import { withRouter } from "next/router";

const ConnectedPublicProfile = connect(
  () => ({}),
  { routeChangeAction }
)(PublicProfile);

class PublicProfilePage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <ConnectedPublicProfile
          userId={
            this.props.router &&
            this.props.router.query &&
            this.props.router.query["user_id"]
          }
          routeChangeAction={this.props.routeChangAction}
        />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withRouter
)(PublicProfilePage);
