import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { submitFinalisedArticleAction, tipArticleAction, deleteArticleCommentAction } from './Module'
import { approveArticleAction } from './Article_Module.bs'
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
      submitFinalisedArticleAction,
      routeChangeAction,
      addToBountyAction,
      tipArticleAction,
      addCommentAction,
      rejectArticleAction: article_id => routeChangeAction(`/article/${article_id}/reject-article`),
      deleteArticleCommentAction,
    }
  ),
  graphql(getArticle, {
    options: ({ article_id }) => ({
      variables: {
        article_id,
      },
    }),
  }),
  withLoading()
)(View)
