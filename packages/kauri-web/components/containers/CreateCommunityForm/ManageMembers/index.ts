import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { IReduxState } from "../../../../lib/Module";
import { openModalAction } from "../../../../../kauri-components/components/Modal/Module";
import View from "./View";
import { getCommunityInvitationsQuery } from "../../../../queries/Community";
import withLoading from "../../../../lib/with-loading";
import withApolloError from "../../../../lib/with-apollo-error";

const mapStateToProps = ({ app: { user } }: IReduxState) => ({
  userAvatar: user && user.avatar,
  userId: user && user.id,
  username: user && user.username,
});

export default compose(
  connect(
    mapStateToProps,
    {
      openModalAction,
      // removeMemberAction // TODO
      // revokeInvitationAction // TODO
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
