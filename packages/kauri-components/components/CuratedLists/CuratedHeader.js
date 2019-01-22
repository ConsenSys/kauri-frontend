import React from 'react'
import styled from "../../lib/styled-components";
import theme from '../../../kauri-web/lib/theme-config'
import SecondaryButton from '../Button/SecondaryButton';

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

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  & > * {
    margin-right: 20px;
  }
`;

const renderDescriptionRowContent = content => {
  if (process.env.STORYBOOK !== 'true') {
    const DescriptionRow = require('../../../kauri-web/components/common/DescriptionRow').default
    return React.createElement(DescriptionRow, { record: { text: content } }, null)
  }
}

const Links = ({ links, Link}) => {
return <LinksContainer>
  {links.map(i => <Link useAnchorTag route={i.url}>
    <SecondaryButton>{i.label}</SecondaryButton>
  </Link>)}
</LinksContainer>
}

const CuratedHeader = ({ Link, header, name, links }) => {
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
          <Links Link={Link} links={[{ label: 'View Community', url: `/community/${header.id}`}].concat(links)} />
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
          <Links Link={Link} links={[{ label: 'View Collection', url: `/collection/${header.id}`}].concat(links)} />
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
            {typeof header.content === 'string' && header.content[0] === '{' ? (
              renderDescriptionRowContent(header.content)
            ) : (
              <p>{header.content}</p>
            )}
          </Description>
          <Links Link={Link} links={[{ label: 'View Article', url: `/collection/${header.id}`}].concat(links)} />
        </Header>
      )
    default:
      return null
  }
}

export default CuratedHeader
