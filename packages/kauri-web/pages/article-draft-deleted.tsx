import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import { withRouter } from "next/router";
import App from "../layouts/App";
import ArticleApproved from "../components/containers/ArticleApproved";

interface IProps {
  router: {
    query: {
      article_id: string;
      article_version: string;
    };
  };
}

class ArticleApprovedPage extends React.Component<IProps> {
  render() {
    return (
      <App confirmationPage={true}>
        <ArticleApproved
          type="draft deleted"
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
)(ArticleApprovedPage);
