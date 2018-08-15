import Homepage from './View.js'
import { compose, graphql } from 'react-apollo'
import { HomePageQuery } from '../../../queries/Homepage'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(HomePageQuery, {
    options: () => ({
      variables: {},
    }),
  }),
  withLoading()
)(Homepage)
