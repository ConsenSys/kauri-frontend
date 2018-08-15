import { TotalArticleBadge } from '../../common/ActionBadge'
import { graphql } from 'react-apollo'
import { totalArticlesCount } from '../../../queries/Article'

export default graphql(totalArticlesCount, {
  options: ({ category }) => ({
    variables: {
      filter: {
        category_in: category,
        status_in: ['PUBLISHED'],
      },
    },
  }),
})(TotalArticleBadge)
