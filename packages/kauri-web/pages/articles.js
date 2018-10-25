import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import { routeChangeAction } from '../lib/Module'
import App from '../layouts/App'
import Articles from '../components/containers/Discover/Articles'
import { withRouter } from 'next/router';

const ConnectedArticles = connect(
  () => ({}),
  { routeChangeAction }
)(Articles)

class ArticlesPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <ConnectedArticles routeChangeAction={this.props.routeChangAction} url={this.props.router} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withRouter,
)(ArticlesPage)
