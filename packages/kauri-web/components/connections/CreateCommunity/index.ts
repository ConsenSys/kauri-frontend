import View from "../../containers/CreateCommunityForm/View";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getCommunity } from "../../../queries/Community";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import { IReduxState } from "../../../lib/Module";
import { getCommunityVariables } from "../../../queries/__generated__/getCommunity";

const mapStateToProps = (state: IReduxState) => ({
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql<{ id: string }, getCommunityVariables>(getCommunity, {
    options: ({ id }: getCommunityVariables) => ({
      variables: {
        id,
      },
    }),
    skip: ({ id }) => !id,
  }),
  withLoading(),
  withApolloError()
)(View);
