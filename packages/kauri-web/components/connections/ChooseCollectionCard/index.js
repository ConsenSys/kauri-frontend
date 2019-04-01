import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getCollectionsForUser } from "../../../queries/Collection";
import withApolloError from "../../../lib/with-apollo-error";
import View from "./View";

const collectionSize = 12;

const mapStateToProps = state => ({
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getCollectionsForUser, {
    options: ({ userId }) => ({
      variables: {
        size: collectionSize, // Because lag and no searchbar
      },
    }),
    name: "searchPublishedCollections",
  }),
  graphql(getCollectionsForUser, {
    options: ({ userId }) => ({
      variables: {
        size: collectionSize, // Because lag and no searchbar
        filter: {
          ownerIdEquals: userId,
        },
      },
    }),
    name: "searchPersonalPublishedCollections",
  }),
  withApolloError()
)(View);

export { collectionSize };
