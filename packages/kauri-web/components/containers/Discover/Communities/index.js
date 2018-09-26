// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { Link } from '../../../../routes'
import { metamask, makerdao, ens, kauri, uport, dharma, aragon, remix, toshi, zeppelin} from '../../../../lib/theme-config';
import CommunityCardConnection from '../../../connections/Community/CommunityCard_Connection.bs'

const communities = [metamask, makerdao, ens, kauri, uport, dharma, aragon, remix, toshi, zeppelin];

type Props = {
  hostName: string,
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const CommunitiesHeader = styled.div`
  background-color: #1e2428;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  padding: 20px;
  padding-bottom: 80px;
`
const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: 32px;
  margin-top: 45px;
  margin-bottom: 12px;

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
    const pageTitle = 'Discover Communities';

    return (
      <ContentContainer>
        <Helmet>
          <title>Kauri - {pageTitle}</title>
          <meta name='description' content="Discover the most bleeding edge projects in the blockchain and open source world" />
          <meta name='keywords' content='ethereum, blockchain, learn to code, developer documentation' />
          <link rel='canonical' href={`https://${this.props.hostName}`} />
        </Helmet>
        <CommunitiesHeader>
          <KauriTitle>{pageTitle}</KauriTitle>
          <KauriDescription>Articles, Tutorials and Collections</KauriDescription>
        </CommunitiesHeader>
        <CommunitiesContainer>
        {communities.map(community => (
            <CommunityCardConnection
                changeRoute={this.props.routeChangeAction}
                key={community.id}
                communityName={community.name}
                communityId={community.id}
                communityHeight={500}
                communityLogo={`/static/images/${community.id}/avatar.png`}
                linkComponent={childrenProps => (
                <Link useAnchorTag route={`/community/${community.id}`}>
                    {childrenProps}
                </Link>
                )}
            />
        ))}
        </CommunitiesContainer>
      </ContentContainer>
    )
  }
}

export default Communities
