import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { globalSearchApprovedArticles } from '../../../queries/Article'
import withLoading from '../../../lib/with-loading'
import withApolloError from '../../../lib/with-apollo-error'
import View from './View'

const mapStateToProps = state => ({
  userId: state.app && state.app.user && state.app.user.id,
})

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(globalSearchApprovedArticles, {
    options: ({ userId }) => ({
      variables: {},
    }),
  }),
  withLoading(),
  withApolloError()
)(View)
