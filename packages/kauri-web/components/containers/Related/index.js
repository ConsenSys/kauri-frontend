import Related from './View.js'
import { compose, graphql } from 'react-apollo'
import { relatedArticles } from '../../../queries/Article'
import { connect } from 'react-redux'
import withLoading from '../../../lib/with-loading'
import withApolloError from '../../../lib/with-apollo-error';

const mapStateToProps = (state, ownProps) => {
  return {};
}

export default compose(
  connect(mapStateToProps),
  graphql(relatedArticles, {
    options: ({ keywords }) => ({
      variables: {
        query: keywords,
      },
      fetchPolicy: 'cache-and-network'
    }),
  }),
  withLoading(),
  withApolloError()
)(Related);
