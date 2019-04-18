import CollectionCreated from "./View.js";
import { routeChangeAction } from "../../../lib/Module";
import { getCollection } from "../../../queries/Collection";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import withLoading from "../../../lib/with-loading";

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getCollection, {
    options: ({ id }) => ({
      variables: { id },
    }),
  }),
  withLoading()
)(CollectionCreated);
