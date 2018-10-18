import ArticleSubmitted from './View.js'
import { routeChangeAction } from '../../../lib/Module'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { getArticle } from '../../../queries/Article'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getArticle, {
    options: ({ id, version }) => ({
      variables: {
        id,
        version,
      },
    }),
  }),
  withLoading()
)(ArticleSubmitted)
