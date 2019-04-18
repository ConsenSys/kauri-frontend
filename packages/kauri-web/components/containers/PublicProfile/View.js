// @flow
import React, { Component } from "react";
import Tabs from "../../../../kauri-components/components/Tabs";
import Collections from "./Collections";
import Header from "./Header";
import EditableHeader from "./EditableHeader";
import Loading from "../../common/Loading";
import type { ViewProps, ViewState } from "./types";
import Published from "./Published/View";
import Manage from "./Manage";

class PublicProfile extends Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
    this.state = {
      isEditing: false,
      avatar: "",
      username: "",
      name: "",
      title: "",
      website: "",
      twitter: "",
      github: "",
    };
  }

  toggleEditing() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const {
      PendingQuery,
      UserQuery,
      ArticlesQuery,
      CollectionQuery,
      DraftsQuery,
      ApprovalsQuery,
      PendingTransfersQuery,
      routeChangeAction,
      currentUser,
      deleteDraftArticleAction,
      rejectArticleTransferAction,
      acceptArticleTransferAction,
      closeModalAction,
      openModalAction,
      isLoggedIn,
      hostName,
    } = this.props;

    const isHeaderLoaded =
      typeof UserQuery.getUser === "object" &&
      typeof ArticlesQuery.searchArticles === "object" &&
      typeof CollectionQuery.searchCollections === "object";

    const areListsLoaded =
      typeof DraftsQuery.searchArticles === "object" &&
      typeof PendingQuery.searchArticles === "object" &&
      typeof ApprovalsQuery.searchArticles === "object";

    const isEditing = this.state.isEditing;
    const isOwner = UserQuery.getUser && UserQuery.getUser.id === currentUser;
    return (
      <React.Fragment>
        {!isHeaderLoaded ? (
          <Loading />
        ) : isEditing ? (
          <EditableHeader
            router={this.props.router}
            toggleEditing={() => this.toggleEditing()}
          />
        ) : (
          <Header
            articles={ArticlesQuery.searchArticles.totalElements}
            collections={CollectionQuery.searchCollections.content}
            currentUser={currentUser}
            id={UserQuery.getUser.id}
            avatar={this.state.avatar || UserQuery.getUser.avatar}
            username={this.state.username || UserQuery.getUser.username}
            name={this.state.name || UserQuery.getUser.name}
            title={this.state.title || UserQuery.getUser.title}
            website={this.state.website || UserQuery.getUser.website}
            twitter={
              this.state.twitter ||
              (UserQuery.getUser.social && UserQuery.getUser.social.twitter)
            }
            github={
              this.state.github ||
              (UserQuery.getUser.social && UserQuery.getUser.social.github)
            }
            toggleEditing={() => this.toggleEditing()}
            hostName={hostName}
          />
        )}
        {isHeaderLoaded && areListsLoaded ? (
          <Tabs
            dark
            router={this.props.router}
            tabs={[
              {
                name: `Articles (${
                  ArticlesQuery.searchArticles.totalElements
                })`,
              },
              {
                name: `Collections (${
                  CollectionQuery.searchCollections.totalElements
                })`,
              },
              isOwner && {
                name: "Manage",
              },
            ]}
            panels={[
              <Published
                data={ArticlesQuery}
                type="published"
                routeChangeAction={routeChangeAction}
                isOwner={isOwner}
                isLoggedIn={!!currentUser}
                openModalAction={openModalAction}
              />,
              <Collections
                isLoggedIn={!!currentUser}
                data={CollectionQuery}
                routeChangeAction={routeChangeAction}
              />,
              isOwner && (
                <Manage
                  approvalsQuery={ApprovalsQuery}
                  draftsQuery={DraftsQuery}
                  pendingQuery={PendingQuery}
                  transfersQuery={PendingTransfersQuery}
                  type="manage"
                  routeChangeAction={routeChangeAction}
                  deleteDraftArticleAction={deleteDraftArticleAction}
                  isOwner={UserQuery.getUser.id === currentUser}
                  isLoggedIn={!!currentUser}
                  closeModalAction={closeModalAction}
                  openModalAction={openModalAction}
                  rejectArticleTransferAction={rejectArticleTransferAction}
                  acceptArticleTransferAction={acceptArticleTransferAction}
                />
              ),
            ]}
          />
        ) : !isHeaderLoaded ? null : (
          <Loading />
        )}
      </React.Fragment>
    );
  }
}

export default PublicProfile;
