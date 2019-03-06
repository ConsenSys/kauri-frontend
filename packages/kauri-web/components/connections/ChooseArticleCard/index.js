import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { searchApprovedArticles } from "../../../queries/Article";
import withApolloError from "../../../lib/with-apollo-error";
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
    name: "searchPublishedArticles",
  }),
  graphql(searchApprovedArticles, {
    options: ({ userId }) => ({
      variables: {
        size: articleSize, // Because lag and no searchbar
        category: userId,
      },
    }),
    name: "searchPersonalPublishedArticles",
  }),
  withApolloError()
)(View);

export { articleSize };
