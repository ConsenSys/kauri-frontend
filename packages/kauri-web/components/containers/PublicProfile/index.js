import PublicProfile from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchPersonalArticles } from '../../../queries/Article';
import { getUserAvatar } from '../../../queries/User';
import { getCollectionsForUser } from '../../../queries/Collection';

export default compose(
  graphql(searchPersonalArticles, {
    name: 'ArticlesQuery',
    options: ({userId}) => ({
      variables: {
        userId,
      },
    }),
  }),
  graphql(getUserAvatar, {
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
      },
    }),
  }),
)(PublicProfile)
