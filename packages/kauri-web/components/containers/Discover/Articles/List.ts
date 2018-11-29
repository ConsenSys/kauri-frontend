import Articles from "./ListView";
import { compose, graphql } from "react-apollo";
import { globalSearchApprovedArticles } from '../../../../queries/Article'
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import withLoading from "../../../../lib/with-loading";
import withPagination from "../../../../lib/with-pagination";


interface IState {
  app: {
    hostName: string,
  }
}

const mapStateToProps = (state: IState) => {
  return { hostName: state.app && state.app.hostName };
};

const QUERY_NAME = "ArticlesQuery";

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
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
