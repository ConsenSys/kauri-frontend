import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import AppWithoutNavbar from '../layouts/AppWithoutNavbar'
import EditProfileComp from '../components/containers/EditProfile'
import { withRouter } from 'next/router';

class EditProfile extends React.Component {
  render() {
    return (
      <AppWithoutNavbar url={this.props.router}>
        <EditProfileComp />
      </AppWithoutNavbar>
    )
  }
}

export default compose(withData, withApollo, withRouter)(EditProfile)
