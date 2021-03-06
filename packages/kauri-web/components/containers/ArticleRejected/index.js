import ArticleRejected from "./View.js";
import { routeChangeAction } from "../../../lib/Module";
import { getArticle } from "../../../queries/Article";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import withLoading from "../../../lib/with-loading";

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app && state.app.user && state.app.user.id,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getArticle, {
    options: ({ id, version }) => ({ variables: { id, version } }),
  }),
  withLoading()
)(ArticleRejected);
