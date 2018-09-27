import PublicProfile from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchPersonalArticles } from '../../../queries/Article';
import { getUserAvatar } from '../../../queries/User';
import { getCollectionsForUser } from '../../../queries/Collection';
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName }
}

export default compose(
  graphql(searchPersonalArticles, {
    name: 'ArticlesQuery',
    options: ({userId}) => ({
      variables: {
          userId
      },
    }),
  }),
  graphql(getUserAvatar, {
    name: 'UserQuery',
    options: ({userId}) => ({
      variables: {
          userId
      },
    }),
  }),
  graphql(getCollectionsForUser, {
    name: 'CollectionQuery',
    options: ({userId}) => ({
      variables: {
        filter: {
          ownerIdEqual: userId,
        }
      },
    }),
  }),
  withLoading()
)(PublicProfile)
