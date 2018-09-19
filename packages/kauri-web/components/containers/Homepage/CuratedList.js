// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard.bs'
import CommunityCardConnection from '../../connections/Community/CommunityCard_Connection.bs'
import theme from '../../../lib/theme-config'
import CuratedHeader from './CuratedHeader'
import { Link } from '../../../routes'
import userIdTrim from '../../../lib/userid-trim'

const Title = styled.h2`
  font-weight: 300;
  font-size: 22px;
  text-transform: capitalize;
  margin-top: 0px;
  color: ${props => (props.featured ? 'white' : '#1e2428')};
`

const Container = styled.div`
  background-color: ${props => props.bgColor};
  width: 100%;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  text-align: center;
  position: relative;
  z-index: 0;

  &:after {
    content: '';
    background: ${props => (props.background ? `url(${props.background}) center center` : props.bgColor)};
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.3;
    z-index: 1;
  }
`

const Resources = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 10;
  position: relative;
`

const getBG = (header, featured) => {
  if (featured && header && header.type === ('TOPIC' || 'COMMUNITY')) {
    return theme[header.id].primaryColor
  } else if (featured) {
    return '#1e2428'
  } else {
    return 'transparent'
  }
}

const HOMEPAGE_CARD_HEIGHT = 290

const CuratedList = ({ routeChangeAction, content: { name, resources, featured, header } }: { routeChangeAction: string => void, content: CuratedListDTO }) => {
  return (
    <Container bgColor={getBG(header, featured)} featured={featured} background={header && typeof header.background === 'string' && header.background}>
      {!header && <Title featured={featured}>{name}</Title>}
      {resources && (
        <Resources>
          {header && <CuratedHeader name={name} header={header} />}
          {resources.map(card => {
            switch (card && card.resourceIdentifier && typeof card.resourceIdentifier.type === 'string' && card.resourceIdentifier.type) {
              case 'ARTICLE': {
                const articleCard: ArticleDTO = card
                return (
                  <ArticleCard
                    changeRoute={routeChangeAction}
                    key={articleCard.id}
                    date={moment(articleCard.dateCreated).format('D MMM YYYY')}
                    title={articleCard.title}
                    content={articleCard.content}
                    userId={articleCard.author && articleCard.author.id}
                    username={articleCard.author && (articleCard.author.name || userIdTrim(articleCard.author.id))}
                    articleId={articleCard.id}
                    articleVersion={articleCard.version}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    linkComponent={(childrenProps, route) => (
                      <Link toSlug={route.includes('article') && articleCard.title} useAnchorTag route={route}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              }
              case 'COLLECTION': {
                const collectionCard: CollectionDTO = card
                const articleCount = collectionCard.sections && collectionCard.sections.reduce(
                  (current, next) => {
                    current += next.resources && next.resources.length
                    return current
                  }, 0)
                return (
                  <CollectionCard
                    changeRoute={routeChangeAction}
                    key={collectionCard.id}
                    collectionName={collectionCard.name}
                    username={collectionCard.owner && (collectionCard.owner.name || userIdTrim(collectionCard.owner.id))}
                    userId={collectionCard.owner && collectionCard.owner.id}
                    articles={articleCount}
                    lastUpdated={moment(collectionCard.dateCreated).fromNow()}
                    collectionId={collectionCard.id}
                    imageURL={collectionCard.background}
                    profileImage={collectionCard.profileImage}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    collectionDescription={collectionCard.description}
                    linkComponent={(childrenProps, route) => (
                      <Link toSlug={route.includes('collection') && collectionCard.name} useAnchorTag route={route}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                ) }
              case 'TOPIC' || 'COMMUNITY': {
                const topic = theme[card.id]
                if (!topic) return null

                return (
                  <CommunityCardConnection
                    changeRoute={routeChangeAction}
                    key={card.id}
                    communityName={card.name || card.id}
                    communityId={card.id}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    communityLogo={`/static/images/${card.id}/avatar.png`}
                    linkComponent={childrenProps => (
                      <Link useAnchorTag route={`/community/${card.id}`}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              }
              default:
                return null
            }
          })}
        </Resources>
      )}
    </Container>
  )
}

export default CuratedList
