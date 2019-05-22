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
} from "./Module";

const mapStateToProps = (
  state: IReduxState,
  ownProps: { communityId: string }
) => {
  let isCommunityAdmin = false;

  if (
    state.app &&
    state.app.user &&
    state.app.user.communities.find(({ id }) => id === ownProps.communityId)
  ) {
    const currentViewedCommunityUserIsMemberOf = state.app.user.communities.find(
      ({ id }) => id === ownProps.communityId
    );
    if (currentViewedCommunityUserIsMemberOf) {
      const currentUserCommunityDetails = currentViewedCommunityUserIsMemberOf.members.find(
        member => member.id === state.app.user.id
      );
      if (currentUserCommunityDetails) {
        if (currentUserCommunityDetails.role === "ADMIN") {
          isCommunityAdmin = true;
        }
      }
    }
  }

  return {
    currentUser: state.app && state.app.user && state.app.user.id,
    hostName: state.app && state.app.hostName,
    isCommunityAdmin,
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
      routeChangeAction,
      sendCommunityInvitationAction,
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
