import View from "../../containers/CreateCollectionForm";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { globalCollectionDetails as getCollection } from "../../../queries/Collection";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";

const mapStateToProps = state => ({
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getCollection, {
    options: ({ id }) => ({
      fetchPolicy: "no-cache",
      variables: {
        id,
      },
    }),
    skip: ({ id }) => !id,
  }),
  withLoading(),
  withApolloError()
)(View);
