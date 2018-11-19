import Collections from "./ListView.js";
import { compose, graphql } from "react-apollo";
import { getLatestCollections } from "../../../../queries/Collection";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import withLoading from "../../../../lib/with-loading";
import withPagination from "../../../../lib/with-pagination";

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName };
};

const QUERY_NAME = "CollectionQuery";

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getLatestCollections, {
    name: QUERY_NAME,
    options: () => ({
      variables: {},
      fetchPolicy: "no-cache",
    }),
  }),
  withLoading()
)(withPagination(Collections, "searchCollections", QUERY_NAME));
