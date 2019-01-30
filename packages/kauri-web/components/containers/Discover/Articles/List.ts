import Articles from "./ListView";
import { compose, graphql } from "react-apollo";
import { globalSearchApprovedArticles } from "../../../../queries/Article";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import withLoading from "../../../../lib/with-loading";
import withPagination from "../../../../lib/with-pagination";
import { openModalAction } from "../../../../../kauri-components/components/Modal/Module";

interface IState {
  app: {
    hostName: string;
    user: { id: string };
  };
}

const mapStateToProps = (state: IState) => {
  return {
    hostName: state.app && state.app.hostName,
    isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
  };
};

const QUERY_NAME = "ArticlesQuery";

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction, openModalAction }
  ),
  graphql(globalSearchApprovedArticles, {
    name: QUERY_NAME,
    options: () => ({
      fetchPolicy: "no-cache",
      variables: {
        filter: {
          mustNotContainTag: ["ethdenver-2019-submission"],
          mustNotIncludeUserId: [
            "b282635ffc0ea4d6984f6b50e9dab90de1d03ce2",
            "5765d2d2fafb930132d72651f3f28c86371379b1",
            "27e77e164bc02788f347213b0a3e9a9a0cdf8d7a",
          ],
          type: "ARTICLE",
        },
      },
    }),
  }),
  withLoading()
)(withPagination(Articles, "searchAutocomplete", QUERY_NAME));
