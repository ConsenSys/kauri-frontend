//@flow
import PublicProfile from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchPersonalArticles, searchPersonalDrafts } from '../../../queries/Article';
import { getUserDetails } from '../../../queries/User';
import { getCollectionsForUser } from '../../../queries/Collection';
import { connect } from 'react-redux';
import { routeChangeAction } from '../../../lib/Module';
import withLoading from '../../../lib/with-loading';
import { saveUserDetailsAction } from './Module'

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName }
}

export default compose(
  connect(
    mapStateToProps,
    {
      saveUserDetailsAction,
    }
  ),
  graphql(searchPersonalArticles, {
    name: 'ArticlesQuery',
    options: ({userId}) => ({
      variables: {
          userId
      },
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
        }
      },
    }),
  }),
  graphql(searchPersonalDrafts, {
    name: 'DraftsQuery',
    options: ({userId}) => ({
      variables: {
        filter: {
          ownerIdEquals: userId,
        }
      },
    }),
  }),
  withLoading()
)(PublicProfile)
