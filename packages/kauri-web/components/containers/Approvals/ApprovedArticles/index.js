import View from './View.js'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import withLoading from '../../../../lib/with-loading'
import { routeChangeAction } from '../../../../lib/Module'
import { approveArticleAction } from '../../Article/Module'
import { searchPendingArticles } from '../../../../queries/Article'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.app && state.app.user && state.app.user.topics,
    ethUsdPrice: state.app.ethUsdPrice,
    userId: state.app.userId,
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      routeChangeAction,
      approveArticleAction,
    }
  ),
  graphql(searchPendingArticles, {
    options: ({ categories }) => ({
      variables: {
        filter: {
          category_in: categories,
          status_in: ['APPROVED'],
        },
      },
    }),
  }),
  withLoading()
)(View)
