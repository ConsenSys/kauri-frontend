import React from "react";
import { compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
// import SubmitArticleForm from "../components/containers/SubmitArticleForm";
import SubmitArticleForm from "../components/containers/SubmitArticleForm/NewNewChina";

interface IProps {
  router: any;
}

class SubmitArticle extends React.Component<IProps> {
  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <SubmitArticleForm />
      </AppWithoutNavbar>
    );
  }
}

export default compose(withData)(SubmitArticle);
