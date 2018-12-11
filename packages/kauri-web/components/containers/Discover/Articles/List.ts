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
      variables: {},
    }),
  }),
  withLoading()
)(withPagination(Articles, "searchArticles", QUERY_NAME));
