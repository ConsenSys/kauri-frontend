//@flow
import View from './View.js'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(withApollo, connect(mapStateToProps, { routeChangeAction }))(View)
