import React from "react";
import { withApollo, compose } from "react-apollo";
import { connect } from "react-redux";
import withData from "../lib/with-data";
import { routeChangeAction } from "../lib/Module";
import App from "../layouts/App";
import SearchResults from "../components/containers/SearchResults";
import { withRouter } from "next/router";

const ConnectedSearchResults = connect(
  () => ({}),
  { routeChangeAction }
)(SearchResults);

class SearchResultsPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <ConnectedSearchResults
          query={this.props.router && this.props.router.query}
          routeChangeAction={this.props.routeChangAction}
          router={this.props.router}
        />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withRouter
)(SearchResultsPage);
