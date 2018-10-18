import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import ArticleSubmitted from '../components/containers/ArticleSubmitted'
import { withRouter } from 'next/router'

class ArticleSubmittedPage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.router}>
        <ArticleSubmitted
          id={this.props.router.query['article_id']}
          version={this.props.router.query['article_version']}
        />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ArticleSubmittedPage)
