// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import SubmittedArticle from '../../SubmittedArticles/SubmittedArticle'

import type { ApproveArticlePayload } from '../../Article/Module'

export const Container = styled.section`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

type Props = {
  ethUsdPrice: number,
  data: { searchRequests: { content: Array<?RequestDTO> }, searchArticles: { content: Array<?ArticleDTO> } },
  userId: string,
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
}

const NoRequestsWithSubmissions = () => <p>No articles to review found, inbox zero! Hurray!</p>

const ArticlesWithoutRequests = ({ articles, ethUsdPrice, userId, routeChangeAction, approveArticleAction }: *) =>
  articles.map(article => (
    <SubmittedArticle
      key={`${article.article_id}-${article.article_version}`}
      type='approval'
      routeChangeAction={routeChangeAction}
      approveArticleAction={approveArticleAction}
      ethUsdPrice={ethUsdPrice}
      article={article}
      userId={userId}
    />
  ))

export default ({
  data: { searchRequests, searchArticles },
  ethUsdPrice,
  userId,
  routeChangeAction,
  approveArticleAction,
}: Props) => (
  <Container>
    {searchArticles && searchArticles.content.length > 0 ? (
      <Fragment>
        {searchArticles &&
          searchArticles.content.length > 0 && (
            <ArticlesWithoutRequests
              userId={userId}
              routeChangeAction={routeChangeAction}
              ethUsdPrice={ethUsdPrice}
              articles={searchArticles && searchArticles.content}
              approveArticleAction={approveArticleAction}
            />
          )}
      </Fragment>
    ) : (
      <NoRequestsWithSubmissions />
    )}
  </Container>
)
