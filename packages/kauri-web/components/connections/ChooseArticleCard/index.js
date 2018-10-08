import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { searchPersonalSubmittedArticles } from '../../../queries/Article'
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
  graphql(searchPersonalSubmittedArticles, {
    options: ({ userId }) => ({
      variables: {
        userId,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View)
