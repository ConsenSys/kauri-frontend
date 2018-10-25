// @flow
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { trackAnalyticsAction } from './Module'
import Link from './View'

export default compose(
  connect(
    () => ({}),
    { trackAnalyticsAction, routeChangeAction: payload => ({ type: 'ROUTE_CHANGE', payload }) }
  )
)(Link)
