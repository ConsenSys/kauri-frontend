import React, {Component} from 'react';
import styled from 'styled-components';
import Tabs from '../../../../kauri-components/components/Tabs';
import Articles from './Articles';
import Collections from './Collections';
import Header from './Header';
import EditableHeader from './EditableHeader';



class PublicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        }
    }

    toggleEditing() {
        this.setState({ isEditing: !this.state.isEditing});
    }

    updateHeader(newDetails) {
        this.setState({...newDetails});
    }

    render() {
        const { UserQuery, ArticlesQuery, CollectionQuery, DraftsQuery, routeChangeAction, userId} = this.props;
        if (!UserQuery.getUser || !ArticlesQuery.searchArticles || !CollectionQuery.searchCollections || !DraftsQuery.searchArticles) return null;
        return (
            <div>
                {console.log(UserQuery)}
                {this.state.isEditing ? <EditableHeader
                    avatar={UserQuery.getUser.avatar}
                    userId={userId}
                    name={UserQuery.getUser.name}
                    username={UserQuery.getUser.username}
                    title={UserQuery.getUser.title}
                    website={UserQuery.getUser.website}
                    twitter={UserQuery.getUser.social && UserQuery.getUser.social.twitter}
                    github={UserQuery.getUser.social && UserQuery.getUser.social.github}
                    toggleEditing={() => this.toggleEditing()}
                    updateHeader={newDetails => this.updateHeader(newDetails)}
                    saveUser={this.props.saveUserDetailsAction}
                /> : <Header
                    articles={ArticlesQuery.searchArticles.content}
                    collections={CollectionQuery.searchCollections.content}
                    currentUser={userId}
                    id={this.state.id || UserQuery.getUser.id}
                    avatar={this.state.avatar || UserQuery.getUser.avatar}
                    username={this.state.username || UserQuery.getUser.username}
                    name={this.state.name || UserQuery.getUser.name}
                    title={this.state.title || UserQuery.getUser.title}
                    website={this.state.website || UserQuery.getUser.website}
                    twitter={this.state.twitter || (UserQuery.getUser.social && UserQuery.getUser.social.twitter)}
                    github={this.state.github || (UserQuery.getUser.social && UserQuery.getUser.social.github)}
                    toggleEditing={() => this.toggleEditing()}
                />}
                <Tabs
                    tabs={[
                        `Articles (${ArticlesQuery.searchArticles.content.length})`,
                        UserQuery.getUser.id === userId && `My Drafts (${DraftsQuery.searchArticles.content.length})`,
                        `Collections (${CollectionQuery.searchCollections.content.length})`
                    ]}
                    panels={[
                        <Articles articles={ArticlesQuery.searchArticles} routeChangeAction={routeChangeAction} />,
                        UserQuery.getUser.id === userId && <Articles articles={DraftsQuery.searchArticles} routeChangeAction={routeChangeAction} />,
                        <Collections collections={CollectionQuery.searchCollections} routeChangeAction={routeChangeAction} />,
                    ]}
                />
            </div>
        );
    }
};

export default PublicProfile;