import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import SubmitArticleForm from "../components/containers/SubmitArticleForm";

class SubmitArticle extends React.Component {
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
  withApollo
)(SubmitArticle);
