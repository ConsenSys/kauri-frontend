import ArticleApproved from "./View";
import { routeChangeAction } from "../../../lib/Module";
import { getArticle } from "../../../queries/Article";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import withLoading from "../../../lib/with-loading";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app.user,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getArticle, {
    options: ({ article_id, article_version }) => ({
      variables: { id: article_id, version: article_version, published: true },
    }),
  }),
  withLoading()
)(ArticleApproved);
