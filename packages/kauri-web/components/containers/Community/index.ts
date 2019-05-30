import View from "./View";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getCommunityAndPendingArticles } from "../../../queries/Community";
import withLoading from "../../../lib/with-loading";
import {
  openModalAction,
  closeModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import { IReduxState, routeChangeAction } from "../../../lib/Module";
import {
  curateCommunityResourcesAction,
  acceptCommunityInvitationAction,
  sendCommunityInvitationAction,
  removeResourceAction,
  transferArticleToCommunityAction,
} from "./Module";

const mapStateToProps = (state: IReduxState) => {
  return {
    currentUser: state.app && state.app.user && state.app.user.id,
    hostName: state.app && state.app.hostName,
    isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      acceptCommunityInvitationAction,
      closeModalAction,
      curateCommunityResourcesAction,
      openModalAction,
      removeResourceAction,
      routeChangeAction,
      sendCommunityInvitationAction,
      transferArticleToCommunityAction,
    }
  ),
  graphql(getCommunityAndPendingArticles, {
    options: ({ communityId }: { communityId: string }) => ({
      variables: {
        id: communityId,
      },
    }),
  }),
  withLoading()
)(View);
