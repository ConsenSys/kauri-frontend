import Collection from "./View.js";
import { compose, graphql } from "react-apollo";
import { globalCollectionDetails } from "../../../queries/Collection";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../lib/Module";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import { openModalAction } from "../../../../kauri-components/components/Modal/Module";
import { approveResourceAction } from "../Community/Module";

const mapStateToProps = (state, ownProps) => {
  return {
    hostName: state.app && state.app.hostName,
    userId: state.app && state.app.user && state.app.user.id,
    communities: state.app && state.app.user && state.app.user.communities,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction, openModalAction, approveResourceAction }
  ),
  graphql(globalCollectionDetails, {
    options: ({ id }) => ({
      variables: {
        id,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(Collection);
