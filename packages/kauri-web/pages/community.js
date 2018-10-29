import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Community from '../components/connections/Community'
import { withRouter } from 'next/router';

class TopicsPage extends React.Component {
  render () {
    return (
      <App url={this.props.router}>
        <Community category={this.props.router && this.props.router.query['category']} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withApollo,
  withRouter,
)(TopicsPage)
