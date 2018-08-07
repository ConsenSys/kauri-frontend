import React from 'react'
import { compose } from 'react-apollo'
import withData from '../lib/with-data'
import AppWithoutNavbar from '../layouts/AppWithoutNavbar'
import SubmitArticle from '../components/containers/SubmitArticleForm'

class ViewArticle extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <AppWithoutNavbar url={this.props.url}>
        <SubmitArticle
          article_id={this.props.url.query['article_id']}
          article_version={this.props.url.query['article_version']}
        />
      </AppWithoutNavbar>
    )
  }
}

export default compose(withData)(ViewArticle)
