import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
// @ts-ignore
import CollectionCard from "../../../../../kauri-components/components/Card/CollectionCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import moment from "moment";
import { searchCollections_searchCollections } from "../../../../queries/__generated__/searchCollections";

interface IProps {
  CollectionQuery: {
    error: string;
    searchCollections?: searchCollections_searchCollections;
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

    const { searchCollections } = this.props.CollectionQuery;

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
        {searchCollections ? (
          <CollectionsContainer>
            {searchCollections &&
              searchCollections.content &&
              searchCollections.content.map(collection => {
                const articleCount =
                  collection &&
                  collection.sections &&
                  collection.sections.reduce((current, next) => {
                    const sectionCount =
                      (next && next.resourcesId && next.resourcesId.length) ||
                      0;
                    current += sectionCount;
                    return current;
                  }, 0);
                return (
                  <CollectionCard
                    key={String(collection && collection.id)}
                    changeRoute={this.props.routeChangeAction}
                    id={collection && collection.id}
                    name={collection && collection.name}
                    description={collection && collection.description}
                    username={
                      collection &&
                      collection.owner &&
                      collection.owner.username
                    }
                    userId={
                      collection && collection.owner && collection.owner.id
                    }
                    userAvatar={
                      collection && collection.owner && collection.owner.avatar
                    }
                    imageURL={collection && collection.background}
                    articleCount={articleCount}
                    date={moment(collection && collection.dateUpdated).format(
                      "D MMM YYYY"
                    )}
                    cardHeight={290}
                    cardWidth={290}
                    linkComponent={(
                      childrenProps: Element[],
                      route: string
                    ) => (
                      <Link
                        toSlug={
                          route.includes("collection") &&
                          collection &&
                          collection.name
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
