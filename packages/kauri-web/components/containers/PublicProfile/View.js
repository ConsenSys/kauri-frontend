// @flow
import React, {Component} from 'react';
import Tabs from '../../../../kauri-components/components/Tabs';
import Articles from './Articles';
import Collections from './Collections';
import Header from './Header';
import EditableHeader from './EditableHeader';

import type { ViewProps, ViewState } from './types';

class PublicProfile extends Component<ViewProps, ViewState> {
  constructor (props: ViewProps) {
    super(props);
    if (props.UserQuery.getUser) {
      this.state = {
        ...props.UserQuery.getUser,
        ...props.UserQuery.getUser.social,
        isEditing: false,
      }
    } else {
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
  }

  toggleEditing () {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render () {
    const { UserQuery, ArticlesQuery, CollectionQuery, DraftsQuery, routeChangeAction, currentUser } = this.props;
    if (!UserQuery.getUser || !ArticlesQuery.searchArticles || !CollectionQuery.searchCollections || !DraftsQuery.searchArticles) return null;
    return (
      <div>
        {
          this.state.isEditing
            ? <EditableHeader
              {...this.state}
              toggleEditing={() => this.toggleEditing()}
              saveUser={this.props.saveUserDetailsAction}
            />
            : <Header
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
        }
        <Tabs
          tabs={[
            `Articles (${ArticlesQuery.searchArticles.content.length})`,
            UserQuery.getUser.id === currentUser && `My Drafts (${DraftsQuery.searchArticles.content.length})`,
            `Collections (${CollectionQuery.searchCollections.content.length})`,
          ]}
          panels={[
            <Articles articles={ArticlesQuery.searchArticles} routeChangeAction={routeChangeAction} />,
            UserQuery.getUser.id === currentUser && <Articles articles={DraftsQuery.searchArticles} routeChangeAction={routeChangeAction} />,
            <Collections collections={CollectionQuery.searchCollections} routeChangeAction={routeChangeAction} />,
          ]}
        />
      </div>
    );
  }
};

export default PublicProfile;
