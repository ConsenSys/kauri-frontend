import View from './View'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkpointArticlesAction } from './Module'

const mapStateToProps = state => ({
  hostName: state.app && state.app.hostName,
})

export default compose(
  connect(
    mapStateToProps,
    { checkpointArticlesAction }
  ),
)(View)
