import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import CommunityCard from "../../../../../kauri-components/components/Card/CommunityCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import { searchCommunities_searchCommunities } from "../../../../queries/__generated__/searchCommunities";

interface IProps {
  CommunityQuery: {
    error: string;
    searchCommunities?: searchCommunities_searchCommunities;
  };
  hostName: string;
  routeChangeAction(route: string): void;
}

export const CommunitiesContainer = styled.div`
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

class Communities extends Component<IProps> {
  render() {
    if (this.props.CommunityQuery.error) {
      return null;
    } // TODO replace with an error message if exists

    const { searchCommunities } = this.props.CommunityQuery;

    return (
      <Fragment>
        <Helmet>
          <title>Kauri - Discover Communities</title>
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
        {searchCommunities ? (
          <CommunitiesContainer>
            {searchCommunities &&
              searchCommunities.content &&
              searchCommunities.content.map(
                (community, index) =>
                  community && (
                    <CommunityCard
                      key={index}
                      communityLogo={community.avatar}
                      communityName={String(community.name)}
                      communityDescription={
                        community.description
                          ? community.description.split(".")[0]
                          : ""
                      }
                      cardHeight={310}
                      articles={
                        (Array.isArray(community.approvedId) &&
                          String(
                            community &&
                              community.approvedId &&
                              community.approvedId.map(
                                resource =>
                                  resource && resource.type === "ARTICLE"
                              ).length
                          )) ||
                        "0"
                      }
                      tags={community.tags}
                      linkComponent={(
                        childrenProps: React.ReactElement<any>
                      ) => (
                        <Link
                          useAnchorTag={true}
                          href={`/community/${community && community.id}`}
                        >
                          {childrenProps}
                        </Link>
                      )}
                    />
                  )
              )}
          </CommunitiesContainer>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Communities;
