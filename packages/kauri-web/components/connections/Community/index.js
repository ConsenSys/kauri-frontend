import View from "./View";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getCommunity } from "../../../queries/Community";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import { openModalAction } from "../../../../kauri-components/components/Modal/Module";

const mapStateToProps = state => ({
  currentUser: state.app && state.app.user && state.app.user.id,
  hostName: state.app && state.app.hostName,
  isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
});

export default compose(
  connect(
    mapStateToProps,
    { openModalAction }
  ),
  graphql(getCommunity, {
    options: ({ category }) => ({
      variables: {
        id: category,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
