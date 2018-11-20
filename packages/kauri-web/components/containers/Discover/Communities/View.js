// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CommunitySearch from './CommunitySearch';
import { Helmet } from 'react-helmet';
import CommunityCard from '../../../../../kauri-components/components/Card/CommunityCard';
import { Link } from '../../../../routes';

type Props = {
  data: {
    searchCommunities?: {
      content: Array<?ArticleDTO>,
    },
    searchCommunities: ?Array<CommunityDTO>,
  },
  hostName: string,
  routeChangeAction: string => void,
};

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CommunitiesHeader = styled.div`
  background-color: ${props => props.theme.colors.primaryTextColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[3]}px;
  padding-bottom: ${props => props.theme.space[3]}px;
`;
const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: ${props => props.theme.fontSizes[5]}px;
  margin-top: ${props => props.theme.space[4]}px;
  margin-bottom: ${props => props.theme.space[3]}px;

  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`;

const KauriDescription = styled.div`
  @media (max-width: 500px) {
    width: 300px;
    margin: auto;
  }
`;

export const CommunitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: 1280px;
`;

class Communities extends Component<Props> {
  static ContentContainer = ContentContainer;

  render () {
    if (this.props.data.error) {
      console.log('There was an issue', this.props.data);
      return null;
    } // TODO replace with an error message if exists

    const { searchCommunities } = this.props.data;

    const pageTitle = 'Discover Communities';

    // console.log(searchCommunitis);
    return (
      <ContentContainer>
        <Helmet>
          <title>Kauri - {pageTitle}</title>
          <meta
            name='description'
            content='Discover the best Communities of blockchain related articles, tutorials and how-to guides'
          />
          <meta
            name='keywords'
            content='ethereum, blockchain, learn to code, developer documentation'
          />
          <link rel='canonical' href={`https://${this.props.hostName}`} />
        </Helmet>
        <CommunitiesHeader>
          <KauriTitle>{pageTitle}</KauriTitle>
          <KauriDescription>User and Project Communities</KauriDescription>
          <CommunitySearch />
        </CommunitiesHeader>
        <CommunitiesContainer>
          {searchCommunities.content.map(community => {
            return (
              <CommunityCard
                changeRoute={this.props.routeChangeAction}
                key={community.id}
                communityLogo={community.avatar}
                communityName={community.name}
                communityDescription={
                  community && community.description
                    ? community.description.split('.')[0]
                    : ''
                }
                communityId={community.id}
                cardHeight={290}
                articles={
                  (Array.isArray(community.approvedId) &&
                    String(
                      community.approvedId.map(
                        resource => resource.type === 'ARTICLE'
                      ).length
                    )) ||
                  '0'
                }
                linkComponent={childrenProps => (
                  <Link useAnchorTag href={`/community/${community.id}`}>
                    {childrenProps}
                  </Link>
                )}
              />
            );
          })}
        </CommunitiesContainer>
      </ContentContainer>
    );
  }
}

export default Communities;
