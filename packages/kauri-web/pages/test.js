import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import TestContainer from '../components/containers/Test/TestContainer.bs'

class Index extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <TestContainer />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Index)
