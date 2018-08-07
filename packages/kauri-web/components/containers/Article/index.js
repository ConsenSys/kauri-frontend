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
  address: state.app && state.app.user && state.app.user.address,
  personalUsername: state.app && state.app.user && state.app.user.username,
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
      rejectArticleAction: (article_id, article_version) =>
        routeChangeAction(`/article/${article_id}/article-version/${article_version}/reject-article`),
      deleteArticleCommentAction,
      publishArticleAction,
    }
  ),
  graphql(getArticle, {
    options: ({ article_id, article_version }) => ({
      variables: {
        article_id,
        article_version,
      },
    }),
  }),
  withLoading()
)(View)
