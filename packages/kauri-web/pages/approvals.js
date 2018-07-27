import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Approvals from '../components/containers/Approvals'

class ApprovalsPage extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {}
  }

  render() {
    return (
      <App url={this.props.url}>
        <Approvals defaultTab={this.props.url.query && this.props.url.query.tab} />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo
)(ApprovalsPage)
