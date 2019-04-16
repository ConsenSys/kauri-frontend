import React from "react";
import styled from "styled-components";
import moment from "moment";
import ArticleCard from "../Card/ArticleCard";
import CollectionCard from "../Card/CollectionCard";
import CommunityCard from "../Card/CommunityCard";
import CuratedHeader from "./CuratedHeader";
import Image from "../Image";

const Title = styled.h2`
  font-weight: 300;
  font-size: 22px;
  text-transform: capitalize;
  margin-top: 0px;
  color: white;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.bgPrimary};
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 0;

  &:after {
    content: "";
    background: ${props =>
      props.background
        ? `url(${props.background}) center center`
        : props.bgColor};
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.25;
    z-index: 1;
  }
`;

const Resources = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 10;
  position: relative;
  flex: 1;
  max-width: 1280px;
  > * {
    margin: ${props => props.theme.space[2]}px;
  }
`;

const Content = styled.div`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`;

export const RenderCardContent = ({ fromAdmin, Link, onCardClick }) => card => {
  switch (
    card &&
      card.resourceIdentifier &&
      typeof card.resourceIdentifier.type === "string" &&
      card.resourceIdentifier.type
  ) {
    case "ARTICLE": {
      const articleCard: ArticleDTO = card;
      return (
        <ArticleCard
          key={`${articleCard.id}-${articleCard.version}`}
          date={articleCard.dateCreated}
          title={articleCard.title}
          description={articleCard.description}
          userId={articleCard.owner && articleCard.owner.id}
          username={articleCard.owner && articleCard.owner.username}
          userAvatar={articleCard.owner && articleCard.owner.avatar}
          id={articleCard.id}
          version={articleCard.version}
          cardHeight={HOMEPAGE_CARD_HEIGHT}
          imageURL={articleCard.attributes && articleCard.attributes.background}
          nfts={articleCard.attributes && articleCard.attributes.nfts}
          linkComponent={(childrenProps, route) => {
            if (fromAdmin) {
              return (
                <div
                  onClick={() =>
                    onCardClick({
                      id: articleCard.id,
                      type: "ARTICLE",
                    })
                  }
                >
                  {childrenProps}
                </div>
              );
            } else {
              return (
                <Link
                  toSlug={
                    route && route.includes("article") && articleCard.title
                  }
                  useAnchorTag
                  href={route}
                >
                  {childrenProps}
                </Link>
              );
            }
          }}
        />
      );
    }
    case "COLLECTION": {
      const collectionCard: CollectionDTO = card;
      const articleCount =
        collectionCard.articleCount ||
        (collectionCard.sections &&
          collectionCard.sections.reduce((current, next) => {
            if (next && Array.isArray(next.resources)) {
              const articlesInSection = next.resources.filter(
                sectionResource => {
                  return (
                    sectionResource &&
                    sectionResource.__typename.toLowerCase().includes("article")
                  );
                }
              );
              return articlesInSection.length + current;
            }
            return current;
          }, 0));

      const collectionCount =
        collectionCard.collectionCount ||
        (collectionCard.sections &&
          collectionCard.sections.reduce((current, next) => {
            if (next && Array.isArray(next.resources)) {
              const collectionsInSection = next.resources.filter(
                sectionResource =>
                  sectionResource &&
                  sectionResource.__typename
                    .toLowerCase()
                    .includes("collection")
              );
              return collectionsInSection.length + current;
            }
            return current;
          }, 0));

      return (
        <CollectionCard
          key={collectionCard.id}
          id={collectionCard.id}
          name={collectionCard.name}
          date={moment(collectionCard.dateUpdated).format("D MMM YYYY")}
          description={collectionCard.description}
          username={
            collectionCard.owner &&
            (collectionCard.owner.name || collectionCard.owner.username)
          }
          userId={collectionCard.owner && collectionCard.owner.id}
          userAvatar={collectionCard.owner && collectionCard.owner.avatar}
          articleCount={articleCount}
          collectionCount={collectionCount}
          imageURL={collectionCard.background}
          cardHeight={HOMEPAGE_CARD_HEIGHT}
          linkComponent={(childrenProps, route) => {
            if (fromAdmin) {
              return (
                <div
                  onClick={() =>
                    onCardClick({
                      id: collectionCard.id,
                      type: "COLLECTION",
                    })
                  }
                >
                  {childrenProps}
                </div>
              );
            } else {
              return (
                <Link
                  toSlug={
                    route && route.includes("article") && collectionCard.name
                  }
                  useAnchorTag
                  href={route}
                >
                  {childrenProps}
                </Link>
              );
            }
          }}
        />
      );
    }
    case "TOPIC" || "COMMUNITY": {
      return (
        <CommunityCard
          key={card.id}
          communityName={card.name || card.id}
          communityId={card.id}
          cardHeight={HOMEPAGE_CARD_HEIGHT}
          communityLogo={`/static/images/${card.id}/avatar.png`}
          linkComponent={childrenProps => (
            <Link useAnchorTag route={`/community/${card.id}`}>
              {childrenProps}
            </Link>
          )}
        />
      );
    }
    default:
      return null;
  }
};

const HOMEPAGE_CARD_HEIGHT = 310;

type Props = {
  routeChangeAction: string => void,
  content: CuratedListDTO,
};

const CuratedList = ({
  Link,
  routeChangeAction,
  content: { name, resources, featured, header, links },
  fromAdmin,
  onCardClick,
}: Props) => {
  const cards = header && resources ? resources.slice(0, 2) : resources;
  const background =
    (header && header.background) ||
    (header && header.attributes && header.attributes.background);

  return (
    <Container>
      {background && (
        <Image
          image={background}
          height="100%"
          width="100%"
          overlay={background && { opacity: 0.5 }}
          asBackground
        />
      )}
      <Content>
        {!header && <Title featured={featured}>{name}</Title>}
        {cards && (
          <Resources>
            {header && (
              <CuratedHeader
                Link={Link}
                featured={featured}
                background={background}
                name={name}
                header={header}
                links={links}
              />
            )}
            {cards.map(
              RenderCardContent({
                routeChangeAction,
                fromAdmin,
                Link,
                onCardClick,
              })
            )}
          </Resources>
        )}
      </Content>
    </Container>
  );
};

export default CuratedList;
