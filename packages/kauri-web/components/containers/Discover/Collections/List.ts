import Collections from "./ListView";
import { compose, graphql } from "react-apollo";
import { getLatestCollections } from "../../../../queries/Collection";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import withLoading from "../../../../lib/with-loading";
import withPagination from "../../../../lib/with-pagination";
const config = require("../../../../config/default");

interface IState {
  app: {
    hostName: string;
  };
}

const mapStateToProps = (state: IState) => {
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
    options: ({ scoringMode }: { scoringMode: string }) => ({
      variables: {
        filter: {
          mustNotIncludeUserId: config.testingAccounts,
          type: "COLLECTION",
        },
        parameter: {
          scoringMode,
        },
      },
    }),
  }),
  withLoading()
)(withPagination(Collections, "searchAutocomplete", QUERY_NAME));
