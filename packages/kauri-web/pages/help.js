import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import { routeChangeAction } from '../lib/Module'
import App from '../layouts/App'
import Community from '../components/connections/Community/index'
import { withRouter } from 'next/router';

const ConnectedCommunity = connect(
  () => ({}),
  { routeChangeAction }
)(Community)

class HelpPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <ConnectedCommunity routeChangeAction={this.props.routeChangeAction} category={'8241ec73308348c890f19a9cdffc50cb'} />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo,
  withRouter,
)(HelpPage)
