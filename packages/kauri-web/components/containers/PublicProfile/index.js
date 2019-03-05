// @flow
import PublicProfile from "./View.js";
import { compose, graphql } from "react-apollo";
import {
  searchPersonalArticles,
  searchPersonalDrafts,
  searchPending,
  searchAwaitingApproval,
} from "../../../queries/Article";
import { getUserDetails } from "../../../queries/User";
import { getCollectionsForUser } from "../../../queries/Collection";
import { deleteDraftArticleAction } from "../Article/DeleteDraftArticleModule";
import {
  closeModalAction,
  openModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import { connect } from "react-redux";
import withLoading from "../../../lib/with-loading";
import { withRouter } from "next/router";

const mapStateToProps = (state, ownProps) => {
  return {
    hostName: state.app && state.app.hostName,
    currentUser: state.app && state.app.userId && state.app.userId.substring(2),
  };
};

export default compose(
  connect(
    mapStateToProps,
    { deleteDraftArticleAction, closeModalAction, openModalAction }
  ),
  graphql(searchPersonalArticles, {
    name: "ArticlesQuery",
    options: ({ userId }) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        userId,
        page: 0,
      },
    }),
  }),
  graphql(getUserDetails, {
    name: "UserQuery",
    options: ({ userId }) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        userId,
        page: 0,
      },
    }),
  }),
  graphql(getCollectionsForUser, {
    name: "CollectionQuery",
    options: ({ userId }) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        page: 0,
        sort: "dateUpdated",
        dir: "DESC",
        filter: {
          ownerIdEquals: userId,
        },
      },
    }),
  }),
  graphql(searchPersonalDrafts, {
    name: "DraftsQuery",
    options: ({ userId }) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        page: 0,
        userId,
      },
    }),
  }),
  graphql(searchPending, {
    name: "PendingQuery",
    options: ({ userId }) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        page: 0,
        userId,
      },
    }),
  }),
  graphql(searchAwaitingApproval, {
    name: "ApprovalsQuery",
    options: ({ userId }) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        page: 0,
        userId,
      },
    }),
  }),
  withLoading()
)(withRouter(PublicProfile));
