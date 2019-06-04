import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import ArticleDraft from "../components/containers/ArticleDraft";
import { withRouter } from "next/router";

class ArticleDraftPage extends React.Component<{ router: any }> {
  render() {
    return (
      <App confirmationPage={true} url={this.props.router}>
        <ArticleDraft
          id={this.props.router.query.id}
          version={this.props.router.query.version}
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ArticleDraftPage);
