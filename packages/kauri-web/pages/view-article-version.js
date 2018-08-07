import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Article from '../components/containers/Article'

class ViewArticle extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <App url={this.props.url}>
        <Article
          article_id={this.props.url.query['article_id']}
          article_version={this.props.url.query['article_version']}
        />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo
)(ViewArticle)
