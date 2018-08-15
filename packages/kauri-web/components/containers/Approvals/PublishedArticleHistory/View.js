// @flow
import React from 'react'
import { Container } from '../ArticleRequests/View'
import SubmittedArticle from '../../SubmittedArticles/SubmittedArticle'

const NoArticlesPublished = () => (
  <Container>
    <p>You have no approved articles that were published.</p>
  </Container>
)

const PublishedArticles = ({
  articles,
  ethUsdPrice,
  userId,
  routeChangeAction,
}: {
  articles: Array<ArticleDTO>,
  ethUsdPrice: number,
  userId: string,
  routeChangeAction: string => void,
}) => (
  <Container>
    {articles.map(article => (
      <SubmittedArticle
        key={`${article.article_id}-${article.article_version}`}
        type='published'
        routeChangeAction={routeChangeAction}
        userId={userId}
        ethUsdPrice={ethUsdPrice}
        article={article}
      />
    ))}
  </Container>
)

type Props = {
  routeChangeAction: string => void,
  data: { searchArticles: { content: Array<?ArticleDTO> } },
  ethUsdPrice: ?number,
  userId: ?string,
}

export default ({
  data: {
    searchArticles: { content },
  },
  ethUsdPrice,
  userId,
  routeChangeAction,
}: Props) =>
  content.length > 0 ? (
    <PublishedArticles
      routeChangeAction={routeChangeAction}
      userId={userId}
      articles={content}
      ethUsdPrice={ethUsdPrice}
    />
  ) : (
    <NoArticlesPublished />
  )
