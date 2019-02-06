// @flow
import React from "react";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";
import { Link } from "../../../routes";
import styled from "styled-components";
import ContentContainer from "./PublicProfileContentContainer";
import PublicProfileEmptyState from "../../../../kauri-components/components/PublicProfileEmptyState";
import { PrimaryButton } from "../../../../kauri-components/components/Button";
import { BodyCard } from "../../../../kauri-components/components/Typography";
import withPagination from "../../../lib/with-pagination";

import type { CollectionsProps } from "./types";

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-top: 1em;
  padding-bottom: 0px;
  max-width: 1280px;
  > div {
    margin: 15px;
  }
`;

const Collections = ({
  data,
  routeChangeAction,
  isLoggedIn,
}: CollectionsProps) =>
  data.searchCollections && data.searchCollections.content.length > 0 ? (
    <ContentContainer>
      <CollectionsContainer>
        {data.searchCollections.content.map(collection => {
          const articleCount =
            collection.sections &&
            collection.sections.reduce((current, next) => {
              current += next.resourcesId && next.resourcesId.length;
              return current;
            }, 0);
          return (
            <CollectionCard
              changeRoute={routeChangeAction}
              key={collection.id}
              id={collection.id}
              name={collection.name}
              date={collection.dateUpdated}
              description={collection.description}
              username={collection.owner && collection.owner.username}
              userId={collection.owner && collection.owner.id}
              userAvatar={collection.owner && collection.owner.avatar}
              articleCount={articleCount}
              imageURL={collection.background}
              cardHeight={310}
              linkComponent={(childrenProps, route) => (
                <Link
                  toSlug={route.includes("collection") && collection.name}
                  useAnchorTag
                  href={route}
                >
                  {childrenProps}
                </Link>
              )}
            />
          );
        })}
      </CollectionsContainer>
    </ContentContainer>
  ) : (
    <Centered>
      <PublicProfileEmptyState
        iconSrc={"/static/images/icons/no-collections-created.svg"}
        description={
          <DescriptionContainer>
            <BodyCard>
              Collections are ways to group and organize articles on Kauri.
            </BodyCard>
            <BodyCard>
              Common collections are tutorial series, articles about a single
              product, multiple projects, or even just a user's favourite
              articles
            </BodyCard>
          </DescriptionContainer>
        }
        title="No Collections Created"
        primaryButton={
          isLoggedIn ? (
            <PrimaryButton
              onClick={() => routeChangeAction("/create-collection")}
            >
              Create Collection
            </PrimaryButton>
          ) : null
        }
      />{" "}
    </Centered>
  );

export default withPagination(Collections, "searchCollections");
