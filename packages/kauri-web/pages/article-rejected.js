import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import ArticleRejected from "../components/containers/ArticleRejected";
import { withRouter } from "next/router";

class ArticleRejectedPage extends React.Component {
  render() {
    return (
      <App confirmationPage url={this.props.router}>
        <ArticleRejected
          article_id={this.props.router.query.article_id}
          article_version={this.props.router.query.article_version}
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ArticleRejectedPage);
