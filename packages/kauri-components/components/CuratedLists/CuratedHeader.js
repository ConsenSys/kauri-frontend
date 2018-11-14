import React from 'react'
import styled from 'styled-components'
import theme from '../../../kauri-web/lib/theme-config'
import DescriptionRow from '../../../kauri-web/components/common/DescriptionRow'

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

const Description = styled.div`
  @media (max-width: 500px) {
    text-align: center;
    align-items: center;
    width: 300px;
    margin: auto;
  }
`

const ListTitle = styled.h2`
  font-weight: 700;
  font-size: 13px;
  text-transform: capitalize;
  margin-top: 0px;
  color: white;
  margin-top: 20px;
`

const Heading = styled.div`
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

const Name = styled.h3`
  color: white;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 28px;
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
    box-shadow: 0px 0px 0px 2px #0ba986;
  }
`

const CuratedHeader = ({ Link, header, name }) => {
  const topic = theme[header.id]
  const imageURL = `/static/images/${header.id}/avatar.png`
  const type = header.__typename || header.resourceIdentifier.type

  switch (type) {
    case 'CommunityDTO':
    case 'COMMUNITY':
      return (
        <Header background={header.background}>
          <ListTitle>{name}</ListTitle>
          <Heading>
            <CommunityLogo src={imageURL} />
            <Name>{header.id}</Name>
          </Heading>
          <Description>{topic.description}</Description>
          <Link useAnchorTag route={`/community/${header.id}`}>
            <Button>View Community</Button>
          </Link>
        </Header>
      )
    case 'CollectionDTO':
    case 'COLLECTION':
      return (
        <Header background={header.background}>
          <ListTitle>{name}</ListTitle>
          <Heading>
            <Name>{header.name}</Name>
          </Heading>
          <Description>{header.description}</Description>
          <Link useAnchorTag toSlug={header.name} route={`/collection/${header.id}`}>
            <Button>View Collection</Button>
          </Link>
        </Header>
      )
    case 'ArticleDTO':
    case 'ARTICLE':
      return (
        <Header background={header.background}>
          <ListTitle>{name}</ListTitle>
          <Heading>
            <Name>{header.title}</Name>
          </Heading>
          <Description>
            <DescriptionRow record={{ text: header.content }} />
          </Description>
          <Link useAnchorTag toSlug={header.name} route={`/article/${header.id}`}>
            <Button>View Article</Button>
          </Link>
        </Header>
      )
    default:
      return null
  }
}

export default CuratedHeader
