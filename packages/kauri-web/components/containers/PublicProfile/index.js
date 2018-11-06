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
      fetchPolicy: 'cache-and-network',
      variables: {
        userId,
        page: 0,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  graphql(getUserDetails, {
    name: 'UserQuery',
    options: ({userId}) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        userId,
        page: 0,
      },
    }),
  }),
  graphql(getCollectionsForUser, {
    name: 'CollectionQuery',
    options: ({userId}) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        page: 0,
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
      fetchPolicy: 'cache-and-network',
      variables: {
        page: 0,
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  graphql(searchPending, {
    name: 'PendingQuery',
    options: ({userId}) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        page: 0,
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  graphql(searchAwaitingApproval, {
    name: 'ApprovalsQuery',
    options: ({userId}) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        page: 0,
        userId,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  withLoading()
)(PublicProfile)
