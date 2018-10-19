import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { getArticle } from '../../../queries/Article'
import { getRequest } from '../../../queries/Request'
import { submitArticleAction, submitArticleVersionAction, editArticleAction, draftArticleAction } from './Module'
import { routeChangeAction, showNotificationAction } from '../../../lib/Module'
import { publishArticleAction } from './PublishArticle_Module.bs'
import withLoading from '../../../lib/with-loading'
import View from './View'

const mapStateToProps = (state, ownProps) => ({
  isKauriTopicOwner: Boolean(
    state.app.user && state.app.user.topics && state.app.user.topics.find(topic => topic === 'kauri')
  ),
  categories: state.app && state.app.user && state.app.user.topics,
  username: state.app.user && state.app.user.username,
  userId: state.app.user && state.app.user && state.app.user.id,
  userAvatar: state.app.user && state.app.user.avatar,
})

export default compose(
  connect(
    mapStateToProps,
    {
      submitArticleAction,
      submitArticleVersionAction,
      editArticleAction,
      routeChangeAction,
      showNotificationAction,
      draftArticleAction,
      publishArticleAction,
    }
  ),
  graphql(getRequest, {
    options: ({ request_id }) => ({
      variables: {
        request_id,
      },
    }),
    skip: ({ request_id }) => !request_id,
  }),
  graphql(getArticle, {
    options: ({ article_id, article_version }) => ({
      variables: {
        id: article_id,
        version: article_version,
      },
    }),
    skip: ({ article_id }) => !article_id,
  }),
  withLoading()
)(View)
