import React from "react";
import {
  getCommunity_getCommunity,
  getCommunity_getCommunity_approved_CollectionDTO,
  getCommunity_getCommunity_approved_ArticleDTO,
} from "../../../queries/__generated__/getCommunity";
import { getCommunityAndPendingArticles_searchArticles } from "../../../queries/__generated__/getCommunityAndPendingArticles";
import CommunityHeader from "./CommunityHeader";
import Tabs from "../../../../kauri-components/components/Tabs";
import DisplayResources from "./DisplayResources";
import Manage from "./Manage";
import R from "ramda";
import { curateCommunityResourcesAction as curateCommunityResources } from "./Module";
import EmptyCollections from "./EmptyStates/Collections";

interface IProps {
  currentUser: string;
  data: {
    getCommunity: getCommunity_getCommunity;
    searchArticles: getCommunityAndPendingArticles_searchArticles;
  };
  closeModalAction: () => void;
  openModalAction: () => void;
  routeChangeAction: (route: string) => void;
  curateCommunityResourcesAction: typeof curateCommunityResources;
}

class CommunityConnection extends React.Component<IProps> {
  render() {
    if (!this.props.data || !this.props.data.getCommunity) {
      return null;
    }

    const {
      data: { getCommunity },
      currentUser,
      closeModalAction,
      openModalAction,
      routeChangeAction,
      curateCommunityResourcesAction,
    } = this.props;
    const articles =
      getCommunity.approved &&
      getCommunity.approved.filter(i => i && i.__typename === "ArticleDTO");
    const collections =
      getCommunity.approved &&
      getCommunity.approved.filter(i => i && i.__typename === "CollectionDTO");
    const isCreator = getCommunity.creatorId === currentUser;
    const isMember =
      isCreator ||
      R.any(R.propEq("id", currentUser), getCommunity.members || []);

    return (
      <>
        <CommunityHeader
          id={String(getCommunity.id)}
          avatar={getCommunity.avatar}
          name={getCommunity.name}
          website={getCommunity.website}
          description={getCommunity.description}
          background={String(
            getCommunity.attributes && getCommunity.attributes.background
          )}
          social={getCommunity.social}
          articles={
            getCommunity.approved &&
            (getCommunity.approved.filter(
              resource => resource && resource.__typename === "ArticleDTO"
            ) as getCommunity_getCommunity_approved_ArticleDTO[])
          }
          collections={
            getCommunity.approved &&
            (getCommunity.approved.filter(
              resource => resource && resource.__typename === "CollectionDTO"
            ) as getCommunity_getCommunity_approved_CollectionDTO[])
          }
          articleCount={(articles && articles.length) || 0}
          collectionCount={(collections && collections.length) || 0}
          tags={getCommunity.tags}
          members={getCommunity.members}
          isMember={isMember}
          isCreator={isCreator}
          openModalAction={openModalAction}
          closeModalAction={closeModalAction}
          routeChangeAction={routeChangeAction}
          curateCommunityResourcesAction={curateCommunityResourcesAction}
        />
        <Tabs
          dark={true}
          tabs={[
            { name: `Home` },
            { name: `Articles (${articles && articles.length})` },
            { name: `Collections (${collections && collections.length})` },
            isCreator || isMember ? { name: "Manage Community" } : null,
          ]}
          panels={[
            <DisplayResources key="home" resources={getCommunity.approved} />,
            <DisplayResources key="articles" resources={articles} />,
            collections && collections.length > 0 ? (
              <DisplayResources key="collections" resources={collections} />
            ) : (
              <EmptyCollections />
            ),
            <Manage
              communityId={String(getCommunity.id)}
              key="manage"
              members={getCommunity.members}
              pending={getCommunity.pending}
              pendingUpdates={
                this.props.data &&
                this.props.data.searchArticles &&
                this.props.data.searchArticles.content
              }
            />,
          ]}
        />
      </>
    );
  }
}

export default CommunityConnection;
