import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import RejectArticle from '../components/containers/RejectArticle'

class RejectArticlePage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.url}>
        <RejectArticle
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
)(RejectArticlePage)
