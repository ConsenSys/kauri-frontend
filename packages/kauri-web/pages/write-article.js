import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import SubmitArticleForm from "../components/containers/SubmitArticleForm";
import { withRouter } from "next/router";

class WriteArticle extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <SubmitArticleForm />
      </AppWithoutNavbar>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(WriteArticle);
