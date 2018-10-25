// @flow
import PublicProfile from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchPersonalArticles, searchPersonalDrafts, searchPending, searchAwaitingApproval } from '../../../queries/Article';
import { getUserDetails, getOwnProfile } from '../../../queries/User';
import { getCollectionsForUser } from '../../../queries/Collection';
import { connect } from 'react-redux';
import withLoading from '../../../lib/with-loading';

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName, currentUser: state.app.userId && state.app.userId.substring(2) }
}

export default compose(
  connect(
    mapStateToProps,
  ),
  graphql(searchPersonalArticles, {
    name: 'ArticlesQuery',
    options: ({userId}) => ({
      variables: {
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  graphql(getUserDetails, {
    name: 'UserQuery',
    options: ({userId}) => ({
      variables: {
        userId,
      },
    }),
  }),
  graphql(getCollectionsForUser, {
    name: 'CollectionQuery',
    options: ({userId}) => ({
      variables: {
        filter: {
          ownerIdEquals: userId,
        },
        fetchPolicy: 'cache-and-network'
      },
    }),
  }),
  graphql(searchPersonalDrafts, {
    name: 'DraftsQuery',
    options: ({userId}) => ({
      variables: {
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  graphql(searchPending, {
    name: 'PendingQuery',
    options: ({userId}) => ({
      variables: {
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  graphql(searchAwaitingApproval, {
    name: 'ApprovalsQuery',
    options: ({userId}) => ({
      variables: {
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  withLoading()
)(PublicProfile)
