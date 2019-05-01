import View from "./View";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getCommunity } from "../../../queries/Community";
import withLoading from "../../../lib/with-loading";
import {
  openModalAction,
  closeModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import { IReduxState, routeChangeAction } from "../../../lib/Module";
import { curateCommunityResourcesAction } from "./Module";

const mapStateToProps = (state: IReduxState) => ({
  currentUser: state.app && state.app.user && state.app.user.id,
  hostName: state.app && state.app.hostName,
  isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
});

export default compose(
  connect(
    mapStateToProps,
    {
      closeModalAction,
      curateCommunityResourcesAction,
      openModalAction,
      routeChangeAction,
    }
  ),
  graphql(getCommunity, {
    options: ({ communityId }: { communityId: string }) => ({
      variables: {
        id: communityId,
      },
    }),
  }),
  withLoading()
)(View);
