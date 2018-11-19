// @flow
import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import CollectionSearch from "./CollectionSearch";

import CollectionCard from "../../../../../kauri-components/components/Card/CollectionCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import moment from "moment";
import userIdTrim from "../../../../lib/userid-trim";

type Props = {
  data: {
    searchCollections: ?Array<CollectionDTO>,
  },
  hostName: string,
  routeChangeAction: string => void,
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

class Collections extends Component<Props> {
  render() {
    if (this.props.data.error) {
      console.log("There was an issue", this.props.data);
      return null;
    } // TODO replace with an error message if exists

    const { searchCollections } = this.props.data;

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
                collection.sections.reduce((current, next) => {
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
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Collections;
