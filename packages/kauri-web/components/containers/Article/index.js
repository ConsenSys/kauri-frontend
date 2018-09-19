import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { tipArticleAction, deleteArticleCommentAction } from './Module'
import { approveArticleAction, publishArticleAction } from './Article_Module.bs'
import { getArticle } from '../../../queries/Article'
import { toggleModalAction, routeChangeAction } from '../../../lib/Module'
import { addCommentAction } from '../AddCommentForm/Module'
import withLoading from '../../../lib/with-loading'
import { addToBountyAction } from '../Requests/Module'
import View from './View'

const mapStateToProps = (state, ownProps) => ({
  ethUsdPrice: state.app.ethUsdPrice,
  topics: state.app && state.app.user && state.app.user.topics,
  userId: state.app && state.app.user && state.app.user.id,
  personalUsername: state.app && state.app.user && state.app.user.username,
  hostName: state.app && state.app.hostName,
})

export default compose(
  connect(
    mapStateToProps,
    {
      toggleModalAction,
      approveArticleAction,
      routeChangeAction,
      addToBountyAction,
      tipArticleAction,
      addCommentAction,
      rejectArticleAction: (article_id, article_version, slug) =>
        routeChangeAction(`/article/${article_id}/v${article_version}/reject-article`),
      deleteArticleCommentAction,
      publishArticleAction,
    }
  ),
  graphql(getArticle, {
    options: ({ id, version }) => ({
      variables: {
        id,
        version: parseInt(version),
      },
    }),
  }),
  withLoading()
)(View)
