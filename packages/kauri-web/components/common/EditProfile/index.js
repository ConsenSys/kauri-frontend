// @flow
import EditProfile from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchPersonalArticles, searchPersonalDrafts, searchPending, searchAwaitingApproval } from '../../../queries/Article';
import { getUserDetails, getOwnProfile } from '../../../queries/User';
import { getCollectionsForUser } from '../../../queries/Collection';
import { connect } from 'react-redux';
import { saveUserDetailsAction } from './Module'

const mapStateToProps = (state, ownProps) => {
  return { hostName: state.app && state.app.hostName, currentUser: state.app.userId && state.app.userId.substring(2) }
}

export default compose(
  connect(
    mapStateToProps,
    {
      saveUserDetailsAction,
    },
    null,
    {withRef: true}
  ),
  graphql(getOwnProfile, {
    name: 'OwnProfile',
    withRef: true,
  }),
)(EditProfile)
