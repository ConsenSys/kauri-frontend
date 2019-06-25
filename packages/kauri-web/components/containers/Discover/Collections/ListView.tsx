import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Head from "next/head";
import CollectionCard from "../../../../../kauri-components/components/Card/CollectionCard";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import {
  searchAutocompleteCollections_searchAutocomplete,
  searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO,
  searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO,
  searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO,
} from "../../../../queries/__generated__/searchAutocompleteCollections";
import theme from "../../../../../kauri-components/lib/theme-config";

const DEFAULT_CARD_WIDTH = theme.DEFAULT_CARD_WIDTH;

interface IProps {
  CollectionQuery: {
    error: string;
    searchAutocomplete?: searchAutocompleteCollections_searchAutocomplete;
  };
  hostName: string;
  routeChangeAction(route: string): void;
}

export const CollectionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: ${props => props.theme.breakpoints[2]};
  > div {
    margin: 15px;
  }
`;

class Collections extends Component<IProps> {
  render() {
    if (this.props.CollectionQuery.error) {
      return null;
    } // TODO replace with an error message if exists

    const { searchAutocomplete } = this.props.CollectionQuery;

    return (
      <Fragment>
        <Head>
          <title>
            Beginner to Advanced Blockchain & Ethereum Tutorials | Collections -
            Kauri
          </title>
          <meta
            name="description"
            content="Discover the best collections of blockchain related articles, tutorials and how-to guides"
          />
          <link
            rel="canonical"
            href={`https://${this.props.hostName}/collections`}
          />
        </Head>
        {searchAutocomplete ? (
          <Masonry>
            {searchAutocomplete &&
              searchAutocomplete.content &&
              searchAutocomplete.content.map(collection => {
                const collectionResource =
                  collection &&
                  (collection.resource as searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO);
                const articleCount =
                  collectionResource &&
                  collectionResource.sections &&
                  collectionResource.sections.reduce((current, next) => {
                    if (next && Array.isArray(next.resourcesId)) {
                      const articlesInSection = next.resourcesId.filter(
                        sectionResource =>
                          sectionResource &&
                          sectionResource.type &&
                          sectionResource.type.toLowerCase().includes("article")
                      );
                      current += articlesInSection.length;
                    }
                    return current;
                  }, 0);

                const collectionCount =
                  collectionResource &&
                  collectionResource.sections &&
                  collectionResource.sections.reduce((current, next) => {
                    if (next && Array.isArray(next.resourcesId)) {
                      const collectionsInSection = next.resourcesId.filter(
                        sectionResource =>
                          sectionResource &&
                          sectionResource.type &&
                          sectionResource.type
                            .toLowerCase()
                            .includes("collection")
                      );
                      current += collectionsInSection.length;
                    }
                    return current;
                  }, 0);

                const typedOwner =
                  collectionResource &&
                  (collectionResource.owner as
                    | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO
                    | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO);

                const owner =
                  collectionResource &&
                  collectionResource.owner &&
                  collectionResource.owner.__typename === "PublicUserDTO"
                    ? {
                        avatar: collectionResource.owner.avatar,
                        id: collectionResource.owner.id || "not_found",
                        type: "USER",
                        username: collectionResource.owner.username,
                      }
                    : collectionResource &&
                      collectionResource.owner &&
                      collectionResource.owner.__typename === "CommunityDTO"
                    ? {
                        avatar: collectionResource.owner.avatar,
                        id: collectionResource.owner.id || "not_found",
                        type: "COMMUNITY",
                        username: collectionResource.owner.name,
                      }
                    : {
                        avatar: "",
                        id: "",
                        username: "",
                      };

                return (
                  <CollectionCard
                    key={String(collectionResource && collectionResource.id)}
                    id={String(collectionResource && collectionResource.id)}
                    name={(collectionResource && collectionResource.name) || ""}
                    description={
                      (collectionResource && collectionResource.description) ||
                      ""
                    }
                    username={
                      typedOwner && typedOwner.__typename === "PublicUserDTO"
                        ? typedOwner.username
                        : typedOwner && typedOwner.name
                    }
                    userId={String(typedOwner && typedOwner.id)}
                    userAvatar={typedOwner && typedOwner.avatar}
                    imageURL={
                      collectionResource && collectionResource.background
                    }
                    articleCount={String(articleCount)}
                    collectionCount={String(collectionCount)}
                    date={collectionResource && collectionResource.dateUpdated}
                    cardHeight={310}
                    cardWidth={DEFAULT_CARD_WIDTH}
                    linkComponent={(
                      childrenProps: React.ReactElement<any>,
                      route: string
                    ) => (
                      <Link
                        toSlug={
                          route &&
                          route.includes("collection") &&
                          collectionResource &&
                          collectionResource.name
                        }
                        useAnchorTag={true}
                        href={route}
                      >
                        {childrenProps}
                      </Link>
                    )}
                    resourceType={owner.type || "USER"}
                  />
                );
              })}
          </Masonry>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Collections;
