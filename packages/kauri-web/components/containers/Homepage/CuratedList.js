import styled from 'styled-components'
import moment from 'moment'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard.bs'
import CommunityCard from '../../../../kauri-components/components/Card/CommunityCard.bs'
import theme from '../../../lib/theme-config'
import CuratedHeader from './CuratedHeader'

const Title = styled.h2`
  font-weight: 300;
  font-size: 22px;
  text-transform: capitalize;
  margin-top: 0px;
  color: ${props => (props.featured ? 'white' : '#1e2428')};
`

const Container = styled.div`
  background: ${props => props.bgColor};
  width: 100%;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  text-align: center;
`

const Resources = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const getBG = (header, featured) => {
  if (featured && header && header.type === ('TOPIC' || 'COMMUNITY')) {
    return theme[header.id].primaryColor
  } else if (featured) {
    return '#0BA986'
  } else {
    return 'transparent'
  }
}

const HOMEPAGE_CARD_HEIGHT = 500;

const CuratedList = ({ routeChangeAction, content: { name, resources, featured, header } } = props) => {
  return (
    <Container bgColor={getBG(header, featured)} featured={featured}>
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
                    date={moment(card.date_created).fromNow()}
                    title={card.subject}
                    content={card.text}
                    userId={card.user.user_id}
                    username={card.user.username}
                    articleId={card.article_id}
                    articleVersion={card.article_version}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
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
                    articles={articles}
                    lastUpdated={moment(card.date_created).fromNow()}
                    collectionId={card.id}
                    imageURL={card.background}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    collectionDescription={card.description}
                  />
                )
              case 'TOPIC' || 'COMMUNITY':
                const topic = theme[card.id]
                if (!topic) return null

                return (
                  <CommunityCard
                    changeRoute={routeChangeAction}
                    key={card.id}
                    communityName={card.name || card.id}
                    articles={8}
                    communityId={card.id}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    communityLogo={`/static/images/${card.id}/avatar.png`}
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
