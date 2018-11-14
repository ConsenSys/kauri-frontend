import React from 'react'
import { compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Test from '../components/connections/Test'

type Props = {}

class CommunityTest extends React.Component<Props> {
  render () {
    return (
      <App>
        <p>Cause I cannot wait to get it on?</p>
        <Test />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData
)(CommunityTest)
