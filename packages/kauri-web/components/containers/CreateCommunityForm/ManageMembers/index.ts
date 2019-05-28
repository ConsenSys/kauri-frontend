import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { IReduxState } from "../../../../lib/Module";
import {
  openModalAction,
  closeModalAction,
} from "../../../../../kauri-components/components/Modal/Module";
import View from "./View";
import { getCommunityInvitationsQuery } from "../../../../queries/Community";
import withLoading from "../../../../lib/with-loading";
import withApolloError from "../../../../lib/with-apollo-error";
import {
  revokeInvitationAction,
  removeMemberAction,
  changeMemberRoleAction,
} from "../../Community/Module";

const mapStateToProps = (
  { app: { user } }: IReduxState,
  ownProps: { id: string }
) => ({
  isCommunityAdmin:
    user &&
    user.communities.find(({ community }) => community.id === ownProps.id) &&
    (user.communities.find(
      ({ community }) => community.id === ownProps.id
    ) as any).role === "ADMIN",
  userAvatar: user && user.avatar,
  userId: user && user.id,
  username: user && user.username,
});

export default compose(
  connect(
    mapStateToProps,
    {
      changeMemberRoleAction,
      closeModalAction,
      openModalAction,
      removeMemberAction,
      revokeInvitationAction,
    }
  ),
  graphql(getCommunityInvitationsQuery, {
    options: ({ id }: { id: string | null }) => ({
      variables: {
        id,
      },
    }),
    skip: ({ id }: { id: string | null }) => !id,
  }),
  withLoading(),
  withApolloError()
)(View);
