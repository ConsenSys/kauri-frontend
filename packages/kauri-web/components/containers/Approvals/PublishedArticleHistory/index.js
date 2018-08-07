import View from './View.js'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import withLoading from '../../../../lib/with-loading'
import routeChangeAction from '../../../../lib/Module'
import { searchPublishedArticleHistory } from '../../../../queries/Article'

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app && state.app.userId,
    categories: state.app && state.app.user && state.app.user.topics,
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(searchPublishedArticleHistory, {
    options: ({ categories, userId }) => ({
      variables: {
        categories,
        userId,
      },
    }),
  }),
  withLoading()
)(View)
