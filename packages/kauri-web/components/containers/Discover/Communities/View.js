// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import CommunitySearch from './CommunitySearch'
import { Helmet } from 'react-helmet';
import CommunityCardConnection from '../../../connections/Community/CommunityCard_Connection.bs';
import { Link } from '../../../../routes';
import moment from 'moment';
import userIdTrim from '../../../../lib/userid-trim';


type Props = {
  data: {
    searchCommunities?: {
      content: Array<?ArticleDTO>,
    },
    searchCommunities: ?Array<CuratedListDTO>
  },
  hostName: string,
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const CommunitiesHeader = styled.div`
background-color: ${props => props.theme.colors.primaryTextColor};
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
color: ${props => props.theme.colors.white};
padding: ${props => props.theme.space[3]}px;
padding-bottom: ${props => props.theme.space[5]}px;
`
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
`

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
`;

class Communities extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    if (!this.props.data || !this.props.data.searchCommunities) {
      return null
    } // TODO replace with an error message if exists

    const { searchCommunities } = this.props.data

    const pageTitle = 'Discover Communities';

    return (
      <ContentContainer>
        <Helmet>
          <title>Kauri - {pageTitle}</title>
          <meta name='description' content="Discover the best Communities of blockchain related articles, tutorials and how-to guides" />
          <meta name='keywords' content='ethereum, blockchain, learn to code, developer documentation' />
          <link rel='canonical' href={`https://${this.props.hostName}`} />
        </Helmet>
        <CommunitiesHeader>
          <KauriTitle>{pageTitle}</KauriTitle>
          <KauriDescription>Users' and Communities' Communities</KauriDescription>
          <CommunitySearch />
        </CommunitiesHeader>
        <CommunitiesContainer>
        {searchCommunities.content.map(community => {
          return <CommunityCardConnection
            changeRoute={this.props.routeChangeAction}
            key={community.id}
            communityName={community.name}
            communityDescription={community.description || ''}
            communityId={community.id}
            communityHeight={500}
            communityLogo={`/static/images/${community.id}/avatar.png`}
            linkComponent={childrenProps => (
            <Link useAnchorTag route={`/community/${community.id}`}>
                {childrenProps}
            </Link>
            )}
        />
        })}
        </CommunitiesContainer>
      </ContentContainer>
    )
  }
}

export default Communities
