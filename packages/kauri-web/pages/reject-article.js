import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import RejectArticle from "../components/containers/RejectArticle";
import { withRouter } from "next/router";

class RejectArticlePage extends React.Component {
  render() {
    return (
      <App confirmationPage url={this.props.router}>
        <RejectArticle
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
)(RejectArticlePage);
