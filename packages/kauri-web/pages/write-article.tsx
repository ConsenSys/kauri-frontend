import React from "react";
import { compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import SubmitArticleForm from "../components/containers/SubmitArticleForm/NewNewChina";
import { withRouter } from "next/router";

class WriteArticle extends React.Component<{ router: any }> {
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
  withRouter
)(WriteArticle);
