import React from 'react'
import styled from 'styled-components'
import theme from '../../../kauri-web/lib/theme-config'
const Link = ({ children }) => children

const Header = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
  margin-right: 15px;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 500px) {
    text-align: center;
    align-items: center;
    width: 300px;
    margin: auto;
  }
`

const HeaderDescription = styled.div`
  @media (max-width: 500px) {
    text-align: center;
    align-items: center;
    width: 300px;
    margin: auto;
  }
`;

const ListTitle = styled.h2`
  font-weight: 300;
  font-size: 22px;
  text-transform: capitalize;
  margin-top: 0px;
  color: white;
  margin-top: 20px;
`

const CommunityHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CommunityLogo = styled.img`
  background: white;
  border-radius: 4px;
  height: 70px;
  width: 70px;
  padding: 10px;
  margin: 10px 20px 20px 0;
`

const CommunityName = styled.h3`
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 30px;
`

const Button = styled.div`
  padding: 10px 20px;
  box-shadow: 0px 0px 0px 1px white;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 11px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0px 0px 0px 2px #0BA986;
  }
`

const CuratedHeader = ({ header, name }) => {
  const topic = theme[header.id]
  const imageURL = `/static/images/${header.id}/avatar.png`

  switch (header && header.type) {
    case 'TOPIC' || 'COMMUNITY':
      return (
        <Header>
          <ListTitle>{name}</ListTitle>
          <CommunityHeading>
            <CommunityLogo src={imageURL} />
            <CommunityName>{header.id}</CommunityName>
          </CommunityHeading>
          <HeaderDescription>{topic.description}</HeaderDescription>
          <Link useAnchorTag route={`/community/${header.id}`}>
            <Button>View Community</Button>
          </Link>
        </Header>
      )
    case 'COLLECTION':
      return (
        <Header background={header.background}>
          <ListTitle>{name}</ListTitle>
          <CommunityHeading>
            <CommunityName>{header.name}</CommunityName>
          </CommunityHeading>
          <HeaderDescription>{header.description}</HeaderDescription>
          <Link useAnchorTag toSlug={header.name} route={`/collection/${header.id}`}>
            <Button>View Collection</Button>
          </Link>
        </Header>
      )
    default:
      return null
  }
}

export default CuratedHeader
