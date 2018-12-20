import Collection from "./View.js";
import { compose, graphql } from "react-apollo";
import { globalCollectionDetails } from "../../../queries/Collection";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../lib/Module";
import withLoading from "../../../lib/with-loading";
import { openModalAction } from "../../../../kauri-components/components/Modal/Module";

const mapStateToProps = (state, ownProps) => {
  return {
    hostName: state.app && state.app.hostName,
    userId: state.app && state.app.user && state.app.user.id,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction, openModalAction }
  ),
  graphql(globalCollectionDetails, {
    options: ({ id }) => ({
      variables: {
        id,
      },
    }),
  }),
  withLoading()
)(Collection);
