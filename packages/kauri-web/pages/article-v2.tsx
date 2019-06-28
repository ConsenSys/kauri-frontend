import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import Article from "../components/containers/ArticleMaterial";
import { withRouter } from "next/router";

interface IProps extends React.Component {
  router: any;
}

class MaterialArticle extends React.Component<IProps> {
  render() {
    return (
      <App maxWidthConstrained={true}>
        <Article
          id={this.props.router.query.article_id}
          version={this.props.router.query.article_version}
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(MaterialArticle);
