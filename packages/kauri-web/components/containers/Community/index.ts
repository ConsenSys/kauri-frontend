import View from "./View";
import { connect } from "react-redux";
import { graphql, compose, withApollo } from "react-apollo";
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

const mapStateToProps = (state: IReduxState, ownProps: any) => {
  return {
    currentUser: state.app && state.app.user && state.app.user.id,
    hostName: state.app && state.app.hostName,
    isCommunityAdmin:
      state.app &&
      state.app.user &&
      state.app &&
      state.app.user.communities.find(
        ({ community }) => community.id === ownProps.communityId
      ) &&
      (
        state.app &&
        (state.app.user.communities.find(
          ({ community }) => community.id === ownProps.communityId
        ) as any)
      ).role === "ADMIN",
    isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
  };
};

export default compose(
  withApollo,
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
