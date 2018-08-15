import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Community from '../components/connections/Community'

class TopicsPage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <Community category={this.props.url && this.props.url.query['category']} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withApollo
)(TopicsPage)
