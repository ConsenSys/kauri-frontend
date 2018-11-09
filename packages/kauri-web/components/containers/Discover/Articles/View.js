// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import ArticleSearchbar from '../../ArticleSearchbar'
import { Helmet } from 'react-helmet'
import ArticleCard from '../../../../../kauri-components/components/Card/ArticleCard'
import { Link } from '../../../../routes'
import moment from 'moment'
import Loading from '../../../common/Loading'
import Masonry from '../../../../../kauri-components/components/Layout/Masonry';
import R from 'ramda'

type Props = {
  data: {
    searchArticles: {
      content: Array<?ArticleDTO>,
    },
  },
  hostName: string,
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ArticlesHeader = styled.div`
  background-color: ${props => props.theme.colors.primaryTextColor};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.space[3]}px;
  padding-bottom: ${props => props.theme.space[3]}px;
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
`

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: 1280px;
  > * {
    margin: 15px;
  }
`

class Articles extends Component<Props> {
  render () {
    const { searchArticles } = this.props.data

    const pageTitle = 'Discover Articles'

    return (
      <ContentContainer>
        <Helmet>
          <title>Kauri - {pageTitle}</title>
          <meta name='description' content='Discover blockchain related articles, tutorials and how-to guides' />
          <meta name='keywords' content='ethereum, blockchain, learn to code, developer documentation' />
          <link rel='canonical' href={`https://${this.props.hostName}`} />
        </Helmet>
        <ArticlesHeader>
          <KauriTitle>{pageTitle}</KauriTitle>
          <KauriDescription>Articles, Tutorials and Collections</KauriDescription>
          <ArticleSearchbar />
        </ArticlesHeader>
        {searchArticles && searchArticles.content.length > 0 ? (
          <Masonry columns={4}>
            {searchArticles.content.map(article => {
              const resourceType = R.path(['owner', 'resourceIdentifier', 'type'])(article)

              return (
                <ArticleCard
                  changeRoute={this.props.routeChangeAction}
                  key={article.id}
                  date={moment(article.dateCreated).format('D MMM YYYY')}
                  title={article.title}
                  content={article.content}
                  username={
                    article.owner &&
                    article.owner.resourceIdentifier &&
                    article.owner.resourceIdentifier.type.toLowerCase() === 'community'
                      ? article.owner && article.owner.name
                      : article.owner && article.owner.username
                  }
                  userId={article.owner ? article.owner.id : 'Anonymous'}
                  userAvatar={article.owner && article.owner.avatar}
                  id={article.id}
                  version={article.version}
                  cardHeight={290}
                  imageURL={article.attributes && article.attributes.background}
                  linkComponent={(childrenProps, route) => (
                    <Link toSlug={route.includes('article') && article.title} useAnchorTag href={route}>
                      {childrenProps}
                    </Link>
                  )}
                  resourceType={typeof resourceType === 'string' && R.toLower(resourceType)}
                />
              )
            })}
          </Masonry>
        ) : (
          <Loading />
        )}
      </ContentContainer>
    )
  }
}

export default Articles
