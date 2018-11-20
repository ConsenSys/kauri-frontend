import React, { Component, Fragment, ReactElement } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import CollectionCard from "../../../../../kauri-components/components/Card/CollectionCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import moment from "moment";

interface IProps {
  CollectionQuery: {
    error: string;
    searchCollections?: CollectionDTO[],
  },
  hostName: string,
  routeChangeAction(route: string): void;
};

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
            {searchCollections.content.map(collection => {
              const articleCount =
                collection.sections &&
                collection.sections.reduce((current: number, next) => {
                  current += next.resourcesId && next.resourcesId.length;
                  return current;
                }, 0);
              return (
                <CollectionCard
                  changeRoute={this.props.routeChangeAction}
                  key={collection.id}
                  id={collection.id}
                  name={collection.name}
                  description={collection.description}
                  username={collection.owner && collection.owner.username}
                  userId={collection.owner && collection.owner.id}
                  userAvatar={collection.owner && collection.owner.avatar}
                  imageURL={collection.background}
                  articleCount={articleCount}
                  date={moment(collection.dateUpdated).format("D MMM YYYY")}
                  cardHeight={290}
                  linkComponent={(childrenProps, route: string) => (
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
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Collections;
