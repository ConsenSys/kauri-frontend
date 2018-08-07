import React from 'react'
import { compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Collection from '../components/containers/Collection'

class CollectionPage extends React.Component {
  render () {
    return (
      <App url={this.props.url} navcolor="transparent">
        <Collection id={this.props.url.query.id} />
      </App>
    )
  }
}

export default compose(withData)(CollectionPage);
