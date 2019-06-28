import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import ArticleProposed from "../components/containers/ArticleProposed";
import { withRouter } from "next/router";

class ArticleProposedPage extends React.Component {
  render() {
    return (
      <App confirmationPage url={this.props.router}>
        <ArticleProposed
          id={this.props.router.query["article_id"]}
          version={this.props.router.query["article_version"]}
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ArticleProposedPage);
