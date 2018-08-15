import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'
import View from './Community.bs'

const mapStateToProps = (state, ownProps) => ({
  ethUsdPrice: state.app.ethUsdPrice,
  userId: state.app && state.app.userId,
})

export default compose(
  connect(
    mapStateToProps,
    {
      routeChangeAction,
    }
  )
)(View)
