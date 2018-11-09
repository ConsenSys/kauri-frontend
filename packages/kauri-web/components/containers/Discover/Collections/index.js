import Collections from './View.js'
import { compose, graphql } from 'react-apollo'
import { getLatestCollections } from '../../../../queries/Collection'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../../lib/Module'
import withLoading from '../../../../lib/with-loading'
import withPagination from '../../../../lib/with-pagination'

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName }
}

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getLatestCollections, {
    options: () => ({
      variables: {},
    }),
  }),
  withLoading()
)(withPagination(Collections, 'searchCollections'))
