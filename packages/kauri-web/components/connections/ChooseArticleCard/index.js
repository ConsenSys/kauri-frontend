import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { searchApprovedArticles } from "../../../queries/Article";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import withPagination from "../../../lib/with-pagination";
import View from "./View";

const articleSize = 12;

const mapStateToProps = state => ({
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(searchApprovedArticles, {
    options: ({ userId }) => ({
      variables: {
        size: articleSize, // Because lag and no searchbar
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(withPagination(View, "searchArticles"));

export { articleSize };
