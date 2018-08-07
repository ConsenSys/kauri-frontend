import View from './View.js'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { searchPendingArticles } from '../../../queries/Article'
import { startDriverStepsAction } from '../../../lib/LocalStorageModule'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = state => ({
  categories: state.app && state.app.user && state.app.user.topics,
})

export default compose(
  connect(
    mapStateToProps,
    { startDriverStepsAction }
  ),
  graphql(searchPendingArticles, {
    options: ({ categories }) => ({
      variables: {
        filter: {
          status_in: ['IN_REVIEW'],
          category_in: categories,
        },
      },
    }),
  }),
  withLoading()
)(View)
