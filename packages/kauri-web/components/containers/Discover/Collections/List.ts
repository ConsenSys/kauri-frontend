import Collections from "./ListView";
import { compose, graphql } from "react-apollo";
import { getLatestCollections } from "../../../../queries/Collection";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import withLoading from "../../../../lib/with-loading";
import withPagination from "../../../../lib/with-pagination";

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
    options: () => ({
      fetchPolicy: "no-cache",
      variables: {
        filter: {
          mustNotIncludeUserId: [
            "b282635ffc0ea4d6984f6b50e9dab90de1d03ce2",
            "5765d2d2fafb930132d72651f3f28c86371379b1",
            "27e77e164bc02788f347213b0a3e9a9a0cdf8d7a",
          ],
        },
      },
    }),
  }),
  withLoading()
)(withPagination(Collections, "searchCollections", QUERY_NAME));
