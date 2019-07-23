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
import {
  curateCommunityResourcesAction as curateCommunityResources,
  acceptCommunityInvitationAction as acceptCommunityInvitation,
  sendCommunityInvitationAction as sendCommunityInvitation,
  transferArticleToCommunityAction as transferArticleToCommunity,
} from "./Module";
import EmptyCollections from "./EmptyStates/Collections";
import AlertViewComponent from "../../../../kauri-components/components/Modal/AlertView";
import AcceptCommunityInvitationModalContent from "../../../../kauri-components/components/Community/AcceptCommunityInvitationModalContent";
import AddMemberModal from "../CreateCommunityForm/AddMemberModal";
import { removeResourceVariables } from "../../../queries/__generated__/removeResource";
import { recordView } from "../../../queries/Utils";
import ApolloClient from "apollo-client";
import HomepageResources from "./HomepageResources";
import {
  routeChangeAction as routeChange,
  showNotificationAction as showNotification,
} from "../../../lib/Module";
import { openModalAction as openModal } from "../../../../kauri-components/components/Modal/Module";
import Head from "next/head";

interface IProps {
  client: ApolloClient<{}>;
  acceptCommunityInvitationAction: typeof acceptCommunityInvitation;
  currentUser: string;
  isCommunityAdmin: boolean;
  secret: null | string;
  communityId: string;
  data: {
    getCommunity: getCommunity_getCommunity;
    searchArticles: getCommunityAndPendingArticles_searchArticles;
  };
  closeModalAction: () => void;
  openModalAction: typeof openModal;
  routeChangeAction: typeof routeChange;
  removeResourceAction: (payload: removeResourceVariables) => void;
  curateCommunityResourcesAction: typeof curateCommunityResources;
  sendCommunityInvitationAction: typeof sendCommunityInvitation;
  transferArticleToCommunityAction: typeof transferArticleToCommunity;
  showNotificationAction: typeof showNotification;
}

class CommunityConnection extends React.Component<IProps> {
  componentDidMount() {
    this.props.client.mutate({
      fetchPolicy: "no-cache",
      mutation: recordView,
      variables: {
        resourceId: {
          id: this.props.communityId,
          type: "COMMUNITY",
        },
      },
    });

    const {
      data: { getCommunity },
      currentUser,
    } = this.props;
    const isCreator = getCommunity.creatorId === currentUser;

    const isMember =
      isCreator ||
      R.any(R.propEq("id", currentUser), getCommunity.members || []);

    if (typeof this.props.secret === "string" && !isMember) {
      // AcceptCommunityInviteModal
      this.props.openModalAction({
        children: (
          <AlertViewComponent
            closeModalAction={this.props.closeModalAction}
            confirmButtonAction={() =>
              this.props.acceptCommunityInvitationAction({
                id: this.props.communityId,
                secret: this.props.secret,
              })
            }
            confirmButtonText={"Accept"}
            content={<AcceptCommunityInvitationModalContent />}
            title={"Accept Invitation To Join Community"}
          />
        ),
      });
    } else {
      this.props.closeModalAction();
    }
  }

  render() {
    if (!this.props.data || !this.props.data.getCommunity) {
      return null;
    }

    const {
      secret,
      data: { getCommunity },
      currentUser,
      closeModalAction,
      openModalAction,
      routeChangeAction,
      // curateCommunityResourcesAction,
      acceptCommunityInvitationAction,
      removeResourceAction,
      transferArticleToCommunityAction,
      isCommunityAdmin,
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
    const homepage = getCommunity.homepage;

    const openAddMemberModal = () =>
      this.props.openModalAction({
        children: (
          <AddMemberModal
            showNotificationAction={this.props.showNotificationAction}
            confirmButtonAction={(invitation: any) => {
              this.props.sendCommunityInvitationAction({
                id: getCommunity.id,
                invitation,
              });
              this.props.closeModalAction();
            }}
            closeModalAction={this.props.closeModalAction}
          />
        ),
      });

    const firstCommunityHomepageSectionResources = R.path<any[]>([
      0,
      "resources",
    ])(homepage);

    const background = R.path<string>(["attributes", "background"])(
      getCommunity
    );

    return (
      <>
        <Head>
          <title>{`${String(getCommunity.name)} - Kauri`}</title>
          {background && (
            <meta
              name="image"
              content={
                background ||
                "https://api.kauri.io:443/ipfs/QmRVCyQ3ng5AWGmjodzXcxg1LK9CRvePmd6ciDXY1mLofY"
              }
            />
          )}
          <meta
            property="og:url"
            content={`https://kauri.io/community/${getCommunity.id}`}
          />
          <link
            rel="canonical"
            href={`https://kauri.io/community/${getCommunity.id}`}
          />
          <meta
            property="og:image"
            content={
              background ||
              "https://api.kauri.io:443/ipfs/QmRVCyQ3ng5AWGmjodzXcxg1LK9CRvePmd6ciDXY1mLofY"
            }
          />
          <meta name="description" content={String(getCommunity.description)} />
        </Head>
        <CommunityHeader
          transferArticleToCommunityAction={transferArticleToCommunityAction}
          secret={secret}
          acceptCommunityInvitationAction={acceptCommunityInvitationAction}
          id={String(getCommunity.id)}
          avatar={getCommunity.avatar}
          name={getCommunity.name}
          website={getCommunity.website}
          description={getCommunity.description}
          background={background}
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
          isCommunityAdmin={isCommunityAdmin}
          openModalAction={openModalAction}
          closeModalAction={closeModalAction}
          routeChangeAction={routeChangeAction}
          // curateCommunityResourcesAction={curateCommunityResourcesAction}
          openAddMemberModal={openAddMemberModal}
        />
        <Tabs
          dark={true}
          tabs={[
            (Array.isArray(homepage) && homepage.length > 0) || isCommunityAdmin
              ? { name: "Home" }
              : null,
            { name: `Articles (${articles && articles.length})` },
            { name: `Collections (${collections && collections.length})` },
            isCreator || isMember ? { name: "Manage Community" } : null,
          ]}
          panels={[
            <HomepageResources
              routeChangeAction={routeChangeAction}
              id={String(getCommunity.id)}
              homepage={homepage}
              isCommunityAdmin={isCommunityAdmin}
              key="home"
              isLoggedIn={!!currentUser}
              userId={currentUser}
              openModalAction={openModalAction}
            />,
            <DisplayResources
              removeResourceAction={removeResourceAction}
              openModalAction={openModalAction}
              closeModalAction={closeModalAction}
              isMember={isMember}
              key="articles"
              type="articles"
              resources={articles}
              communityId={getCommunity.id}
            />,
            collections && collections.length > 0 ? (
              <DisplayResources
                removeResourceAction={removeResourceAction}
                openModalAction={openModalAction}
                closeModalAction={closeModalAction}
                isMember={isMember}
                type="collections"
                key="collections"
                resources={collections}
                communityId={getCommunity.id}
              />
            ) : (
              <EmptyCollections />
            ),
            <Manage
              isCommunityAdmin={isCommunityAdmin}
              openAddMemberModal={openAddMemberModal}
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
