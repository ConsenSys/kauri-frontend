import React from 'react'
import withData from '../lib/with-data'
import App from '../layouts/App'
import TopicHome from '../components/containers/TopicHome'

class TopicHomePage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <TopicHome category={this.props.url.query.category} />
      </App>
    )
  }
}

export default compose(withData)(TopicHomePage)
