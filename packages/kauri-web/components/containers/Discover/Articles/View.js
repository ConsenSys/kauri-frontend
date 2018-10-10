// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import ArticleSearchbar from '../../ArticleSearchbar'
import { Helmet } from 'react-helmet';
import ArticleCard from '../../../../../kauri-components/components/Card/ArticleCard.bs';
import { Link } from '../../../../routes';
import moment from 'moment';
import userIdTrim from '../../../../lib/userid-trim';

type Props = {
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>,
    },
    searchArticles: ?Array<CuratedListDTO>
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
`;

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: 1280px;
`;

class Collections extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    if (!this.props.data || !this.props.data.searchArticles) {
      return null
    } // TODO replace with an error message if exists

    const { searchArticles } = this.props.data

    const pageTitle = 'Discover Articles';

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
        <ArticlesContainer>
          {searchArticles.content.map(article => {
            return <ArticleCard
              changeRoute={this.props.routeChangeAction}
              key={article.id}
              date={moment(article.dateCreated).format('D MMM YYYY')}
              title={article.title}
              content={article.content}
              userId={article.owner ? article.owner.id : 'Anonymous'}
              username={article.owner ? (article.owner.username || userIdTrim(article.owner.id)) : 'Anonymous'}
              articleId={article.id}
              articleVersion={article.version}
              cardHeight={500}
              imageURL={article.attributes && article.attributes.background}
              linkComponent={(childrenProps, route) => (
                <Link toSlug={route.includes('article') && article.title} useAnchorTag route={route}>
                  {childrenProps}
                </Link>
              )}
            />
          })}
        </ArticlesContainer>
      </ContentContainer>
    )
  }
}

export default Collections
