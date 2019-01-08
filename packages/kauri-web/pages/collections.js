import React from "react";
import { withApollo, compose } from "react-apollo";
import { connect } from "react-redux";
import withData from "../lib/with-data";
import { routeChangeAction } from "../lib/Module";
import App from "../layouts/App";
import Collections from "../components/containers/Discover/Collections";
import { withRouter } from "next/router";
import WelcomeBanner from "../../kauri-components/components/WelcomeBanner/Homepage";

const Connectedcollections = connect(
  () => ({}),
  { routeChangeAction }
)(Collections);

class CollectionsPage extends React.Component {
  render() {
    return (
      <>
        <WelcomeBanner />
        <App url={this.props.router}>
          <Connectedcollections
            routeChangeAction={this.props.routeChangAction}
            url={this.props.router}
          />
        </App>
      </>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withRouter
)(CollectionsPage);
