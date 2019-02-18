import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import CollectionCard from "../../../../../kauri-components/components/Card/CollectionCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import {
  searchAutocompleteCollections_searchAutocomplete,
  searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO,
  searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO,
  searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO,
} from "../../../../queries/__generated__/searchAutocompleteCollections";

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
  max-width: 1280px;
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
        <Helmet>
          <title>Kauri - Discover Collections</title>
          <meta
            name="description"
            content="Discover the best collections of blockchain related articles, tutorials and how-to guides"
          />
          <meta
            name="keywords"
            content="ethereum, blockchain, learn to code, developer documentation"
          />
          <link
            rel="canonical"
            href={`https://${this.props.hostName}/collections`}
          />
        </Helmet>
        {searchAutocomplete ? (
          <CollectionsContainer>
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
                    const sectionCount =
                      (next && next.resourcesId && next.resourcesId.length) ||
                      0;
                    current += sectionCount;
                    return current;
                  }, 0);

                const typedOwner =
                  collectionResource &&
                  (collectionResource.owner as
                    | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO
                    | searchAutocompleteCollections_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO);
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
                    date={collectionResource && collectionResource.dateUpdated}
                    cardHeight={310}
                    cardWidth={290}
                    linkComponent={(
                      childrenProps: React.ReactElement<any>,
                      route: string
                    ) => (
                      <Link
                        toSlug={
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
                  />
                );
              })}
          </CollectionsContainer>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Collections;
