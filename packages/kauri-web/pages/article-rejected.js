import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import ArticleRejected from '../components/containers/ArticleRejected'

class ArticleRejectedPage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.url}>
        <ArticleRejected
          article_id={this.props.url.query.article_id}
          article_version={this.props.url.query.article_version}
        />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo
)(ArticleRejectedPage)
