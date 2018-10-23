// @flow
import React, { Component } from 'react'
import Tabs from '../../../../kauri-components/components/Tabs'
import Articles from './Articles'
import Collections from './Collections'
import Header from './Header'
import EditableHeader from './EditableHeader'
import Loading from '../../common/Loading'

import type { ViewProps, ViewState } from './types'

class PublicProfile extends Component<ViewProps, ViewState> {
  constructor (props: ViewProps) {
    super(props)
    this.state = {
      isEditing: false,
      avatar: '',
      username: '',
      name: '',
      title: '',
      website: '',
      twitter: '',
      github: '',
    }
  }

  toggleEditing () {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render () {
    const {
      PendingQuery,
      UserQuery,
      ArticlesQuery,
      CollectionQuery,
      DraftsQuery,
      ApprovalsQuery,
      routeChangeAction,
      currentUser,
    } = this.props

    const isHeaderLoaded =
      typeof UserQuery.getUser === 'object' &&
      typeof ArticlesQuery.searchArticles === 'object' &&
      typeof CollectionQuery.searchCollections === 'object'

    const areListsLoaded =
      typeof DraftsQuery.searchArticles === 'object' &&
      typeof PendingQuery.searchArticles === 'object' &&
      typeof ApprovalsQuery.searchArticles === 'object'

    const isEditing = this.state.isEditing

    return (
      <React.Fragment>
        {!isHeaderLoaded ? (
          <Loading />
        ) : isEditing ? (
          <EditableHeader toggleEditing={() => this.toggleEditing()} />
        ) : (
          <Header
            articles={ArticlesQuery.searchArticles.content}
            collections={CollectionQuery.searchCollections.content}
            currentUser={currentUser}
            id={UserQuery.getUser.id}
            avatar={this.state.avatar || UserQuery.getUser.avatar}
            username={this.state.username || UserQuery.getUser.username}
            name={this.state.name || UserQuery.getUser.name}
            title={this.state.title || UserQuery.getUser.title}
            website={this.state.website || UserQuery.getUser.website}
            twitter={this.state.twitter || (UserQuery.getUser.social && UserQuery.getUser.social.twitter)}
            github={this.state.github || (UserQuery.getUser.social && UserQuery.getUser.social.github)}
            toggleEditing={() => this.toggleEditing()}
          />
        )}
        {isHeaderLoaded && areListsLoaded ? (
          <Tabs
            tabs={[
              `Articles (${ArticlesQuery.searchArticles.content.length})`,
              UserQuery.getUser.id === currentUser && `My Drafts (${DraftsQuery.searchArticles.content.length})`,
              `Collections (${CollectionQuery.searchCollections.content.length})`,
              UserQuery.getUser.id === currentUser &&
                `Awaiting Owner Approval (${ApprovalsQuery.searchArticles.content.length})`,
              UserQuery.getUser.id === currentUser &&
                `Pending My Approval(${PendingQuery.searchArticles.content.length})`,
            ]}
            panels={[
              <Articles
                type='published'
                articles={ArticlesQuery.searchArticles}
                routeChangeAction={routeChangeAction}
              />,
              UserQuery.getUser.id === currentUser && (
                <Articles type='draft' articles={DraftsQuery.searchArticles} routeChangeAction={routeChangeAction} />
              ),
              <Collections collections={CollectionQuery.searchCollections} routeChangeAction={routeChangeAction} />,
              <Articles
                type='pending'
                articles={ApprovalsQuery.searchArticles}
                routeChangeAction={routeChangeAction}
              />,
              <Articles
                type='toBeApproved'
                articles={PendingQuery.searchArticles}
                routeChangeAction={routeChangeAction}
              />,
            ]}
          />
        ) : !isHeaderLoaded ? null : (
          <Loading />
        )}
      </React.Fragment>
    )
  }
}

export default PublicProfile
