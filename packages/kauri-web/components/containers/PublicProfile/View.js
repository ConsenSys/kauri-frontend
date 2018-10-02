import React, {Component} from 'react';
import styled from 'styled-components';
import Tabs from '../../../../kauri-components/components/Tabs';
import Articles from './Articles';
import Collections from './Collections';
import Header from './Header';
import EditableHeader from './EditableHeader';
import { User } from '../../../queries/User';


class PublicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: true,
        }
    }

    toggleEditing() {
        this.setState({ isEditing: !this.state.isEditing});
    }

    render() {
        const { UserQuery, ArticlesQuery, CollectionQuery, DraftsQuery, routeChangeAction, userId} = this.props;
        if (!UserQuery.getUser || !ArticlesQuery.searchArticles || !CollectionQuery.searchCollections || !DraftsQuery.searchArticles) return null;
        return (
            <div>
                {this.state.isEditing ? <EditableHeader
                    avatar={UserQuery.getUser.avatar}
                    userId={userId}
                    username={UserQuery.getUser.name}
                    title={UserQuery.getUser.title}
                    website={UserQuery.getUser.website}
                    toggleEditing={() => this.toggleEditing()}
                    saveUser={this.props.saveUserDetailsAction}
                /> : <Header
                    articles={ArticlesQuery.searchArticles.content}
                    collections={CollectionQuery.searchCollections.content}
                    currentUser={userId}
                    user={UserQuery.getUser}
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