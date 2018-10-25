import React from 'react'
import { compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Collection from '../components/containers/Collection'
import { withRouter } from 'next/router';

class CollectionPage extends React.Component {
  render () {
    return (
      <App url={this.props.router} navcolor='transparent'>
        <Collection id={this.props.router.query.collection_id} />
      </App>
    )
  }
}

export default compose(withData, withRouter)(CollectionPage);
