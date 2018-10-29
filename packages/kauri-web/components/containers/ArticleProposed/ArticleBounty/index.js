import ArticleBounty from './View.js'
import { compose, graphql } from 'react-apollo'
import { getRequest } from '../../../../queries/Request'

export default compose(
  graphql(getRequest, {
    options: ({ request_id }) => ({
      variables: {
        request_id,
      },
    }),
  })
)(ArticleBounty)
