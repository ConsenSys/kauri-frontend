import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import { routeChangeAction } from '../lib/Module'
import App from '../layouts/App'
import Communities from '../components/connections/Communities/Communities.bs'

const ConnectedCommunities = connect(
  () => ({}),
  { routeChangeAction }
)(Communities)

class TopicsPage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <ConnectedCommunities routeChangeAction={this.props.routeChangAction} url={this.props.url} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(TopicsPage)
