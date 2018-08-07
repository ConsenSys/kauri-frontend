// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
// import faker from 'faker'
import { Divider } from 'antd'
import SubmittedArticle from './SubmittedArticle'
import { OpenRequestsHeader as SubmittedArticlesHeader } from '../OpenRequests/View'

type Props = {
  userId?: string,
  data: { searchArticles?: ?{ content?: Array<ArticleDTO> } },
  routeChangeAction: string => void,
  ethUsdPrice?: number,
}

const Container = styled.section`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

class SubmittedArticles extends Component<Props> {
  static Container = Container

  render () {
    if (this.props.data.loading) return <p>Loading...</p>

    const { ethUsdPrice, userId, routeChangeAction } = this.props

    const pendingReviewArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ status }) => status === 'IN_REVIEW')

    const awaitingPublicationArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ status }) => status === 'APPROVED')

    const publishedArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ status }) => status === 'PUBLISHED')

    const draftArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ status }) => status === 'DRAFT')

    const personalArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ category }) => !category)

    return (
      <SubmittedArticles.Container>
        {Array.isArray(awaitingPublicationArticles) && (
          <Fragment>
            <SubmittedArticlesHeader>Awaiting Publication</SubmittedArticlesHeader>
            <Divider />
            {awaitingPublicationArticles.length > 0 &&
              awaitingPublicationArticles.map(article => (
                <SubmittedArticle
                  key={`${article.article_id}-${article.article_version}`}
                  type='personal'
                  routeChangeAction={routeChangeAction}
                  userId={userId}
                  article={article}
                  ethUsdPrice={ethUsdPrice}
                />
              ))}
          </Fragment>
        )}
        <SubmittedArticlesHeader>Pending Review</SubmittedArticlesHeader>
        <Divider />
        {Array.isArray(pendingReviewArticles) && pendingReviewArticles.length > 0 ? (
          pendingReviewArticles.map(article => (
            <SubmittedArticle
              key={`${article.article_id}-${article.article_version}`}
              type='personal'
              routeChangeAction={routeChangeAction}
              userId={userId}
              article={article}
              ethUsdPrice={ethUsdPrice}
            />
          ))
        ) : (
          <p>No submitted articles.</p>
        )}
        {Array.isArray(draftArticles) && (
          <Fragment>
            <SubmittedArticlesHeader>Draft Articles</SubmittedArticlesHeader>
            <Divider />
            {draftArticles.length > 0 &&
              draftArticles.map(article => (
                <SubmittedArticle
                  key={`${article.article_id}-${article.article_version}`}
                  type='personal'
                  routeChangeAction={routeChangeAction}
                  userId={userId}
                  article={article}
                  ethUsdPrice={ethUsdPrice}
                />
              ))}
          </Fragment>
        )}
        {Array.isArray(personalArticles) && (
          <Fragment>
            <SubmittedArticlesHeader>Personal Articles</SubmittedArticlesHeader>
            <Divider />
            {personalArticles.length > 0 &&
              personalArticles.map(article => (
                <SubmittedArticle
                  key={`${article.article_id}-${article.article_version}`}
                  type='personal'
                  routeChangeAction={routeChangeAction}
                  userId={userId}
                  article={article}
                  ethUsdPrice={ethUsdPrice}
                />
              ))}
          </Fragment>
        )}
        <SubmittedArticlesHeader>Published Articles</SubmittedArticlesHeader>
        <Divider />
        {Array.isArray(publishedArticles) && publishedArticles.length > 0 ? (
          publishedArticles.map(article => (
            <SubmittedArticle
              key={`${article.article_id}-${article.article_version}`}
              type='personal'
              routeChangeAction={routeChangeAction}
              userId={userId}
              article={article}
              ethUsdPrice={ethUsdPrice}
            />
          ))
        ) : (
          <p>No published articles.</p>
        )}
      </SubmittedArticles.Container>
    )
  }
}

export default SubmittedArticles
