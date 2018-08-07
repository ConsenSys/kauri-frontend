import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import withLoading from '../../../../../lib/with-loading'
import { searchPendingArticles } from '../../../../../queries/Article'
import { routeChangeAction } from '../../../../../lib/Module'
import { approveArticleAction } from '../../../Article/Module'
import ArticleRequestSubmissions from './View'

// -> Nested searchArticles w / request_id_eq filter query for .map(article => <PendingArticle />)
const mapStateToProps = (state, ownProps) => {
  return {}
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
    options: ({ request_id }) => ({
      variables: {
        filter: {
          request_id_eq: request_id,
          status_in: ['IN_REVIEW'],
        },
      },
    }),
  }),
  withLoading()
)(ArticleRequestSubmissions)
