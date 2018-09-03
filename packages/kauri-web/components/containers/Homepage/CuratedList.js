import styled from 'styled-components'
import moment from 'moment'
import { ArticleCard, CollectionCard } from '@kauri/components'
import CommunityCardConnection from '../../connections/Community/CommunityCard_Connection.bs'
import theme from '../../../lib/theme-config'
import CuratedHeader from './CuratedHeader'
const Link = process.env.STORYBOOK
  ? ({ children }) => {
    return children
  }
  : require('../../../routes').Link

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

const CuratedList = ({ routeChangeAction, content: { name, resources, featured, header } } = props) => {
  return (
    <Container bgColor={getBG(header, featured)} featured={featured} background={header && header.background}>
      {!header && <Title featured={featured}>{name}</Title>}
      {resources && (
        <Resources>
          {header && <CuratedHeader name={name} header={header} />}
          {resources.map(card => {
            switch (card.type) {
              case 'ARTICLE':
                return (
                  <ArticleCard
                    changeRoute={routeChangeAction}
                    key={card.article_id}
                    date={moment(card.date_created).format('D MMM YYYY')}
                    title={card.subject}
                    content={card.text}
                    userId={card.user.user_id}
                    username={card.user.username}
                    articleId={card.article_id}
                    articleVersion={card.article_version}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    linkComponent={(childrenProps, route) => (
                      <Link toSlug={route.includes('article') && card.subject} useAnchorTag route={route}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              case 'COLLECTION':
                const articles = card.sections.reduce((acc, item) => {
                  acc += item.article_id.length
                  return acc
                }, 0)
                return (
                  <CollectionCard
                    changeRoute={routeChangeAction}
                    key={card.id}
                    collectionName={card.name}
                    username={card.owner.username}
                    userId={card.owner.user_id}
                    articles={articles}
                    lastUpdated={moment(card.date_created).fromNow()}
                    collectionId={card.id}
                    imageURL={card.background}
                    profileImage={card.profileImage}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    collectionDescription={card.description}
                    linkComponent={(childrenProps, route) => (
                      <Link toSlug={route.includes('collection') && card.name} useAnchorTag route={route}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              case 'TOPIC' || 'COMMUNITY':
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
