import React from "react";
import { withApollo, compose } from "react-apollo";
import { connect } from "react-redux";
import withData from "../lib/with-data";
import { routeChangeAction } from "../lib/Module";
import App from "../layouts/App";
import Community from "../components/containers/Community";
import { withRouter } from "next/router";

const ConnectedCommunity = connect(
  () => ({}),
  { routeChangeAction }
)(Community);

class HelpPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        {console.log(process.env)}
        <ConnectedCommunity
          routeChangeAction={this.props.routeChangeAction}
          category={process.env.KauriCommunityId}
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(HelpPage);
