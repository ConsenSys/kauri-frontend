import React from "react";
import { compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import SubmitArticle from "../components/containers/SubmitArticleForm";
import { withRouter } from "next/router";

class ViewArticle extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <SubmitArticle
          id={this.props.router.query["id"]}
          version={this.props.router.query["version"]}
        />
      </AppWithoutNavbar>
    );
  }
}

export default compose(
  withData,
  withRouter
)(ViewArticle);
