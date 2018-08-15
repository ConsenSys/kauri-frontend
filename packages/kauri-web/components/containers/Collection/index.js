import Collection from './View.js'
import { compose, graphql } from 'react-apollo'
import { globalCollectionDetails } from '../../../queries/Collection'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(globalCollectionDetails, {
    options: ({ id }) => ({
      variables: {
        id,
      },
    }),
  }),
  withLoading()
)(Collection)
