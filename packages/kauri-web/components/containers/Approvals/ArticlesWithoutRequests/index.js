import ArticleRequests from './View.js'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { searchOpenRequestsWithSubmissions } from '../../../../queries/Request'
import { routeChangeAction } from '../../../../lib/Module'
import { approveArticleAction } from '../../Article/Module'
import withLoading from '../../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return {
    ethUsdPrice: state.app.ethUsdPrice,
    userId: state.app && state.app.userId,
    categories: state.app && state.app.user && state.app.user.topics,
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
  graphql(searchOpenRequestsWithSubmissions, {
    options: ({ categories }) => ({
      variables: {
        filter: {
          status_in: ['OPENED'],
          category_in: categories,
          total_submissions_gt: 0,
        },
        articleFilter: {
          status_in: 'IN_REVIEW',
          category_in: categories,
          request_id_eq: '',
          latest_version: false,
        },
      },
    }),
  }),
  withLoading()
)(ArticleRequests)
