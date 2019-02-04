import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import ResourceRows from "./ResourceRows";
import { routeChangeAction } from "../../../lib/Module";
import { searchResultsAutocomplete } from "../../../queries/Search";
import withLoading from "../../../lib/with-loading";
import withPagination from "../../../lib/with-pagination";

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

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(searchResultsAutocomplete, {
    options: ({
      viewedSearchCategory,
      query,
    }: {
      viewedSearchCategory: string | null;
      query: string;
    }) => {
      const variables = {
        filter: {
          mustNotContainTag: ["ethdenver-2019-submission"],
          type: viewedSearchCategory,
        },
        page: 0,
        query,
        size: 10,
      };
      return {
        fetchPolicy: "no-cache",
        variables,
      };
    },
  }),
  withLoading()
)(withPagination(ResourceRows, "searchAutocomplete"));
