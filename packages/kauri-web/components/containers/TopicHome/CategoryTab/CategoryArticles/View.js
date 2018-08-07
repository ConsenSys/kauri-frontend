// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import CategoryArticle from './CategoryArticle'
import CategoryArticlesFilter from './CategoryArticlesFilter'

type Props = {
  userId?: string,
  ethUsdPrice: number,
  data?: {
    searchArticles?: ?{ content?: Array<?ArticleDTO> },
    refetch: any,
  },
  recentArticlesFeed?: boolean,
  routeChangeAction?: string => void,
}

const Container = styled.section``

class CategoryArticles extends Component<Props> {
  static Container = Container

  render () {
    const { ethUsdPrice, routeChangeAction } = this.props

    return (
      <CategoryArticles.Container>
        {!this.props.recentArticlesFeed && (
          <CategoryArticlesFilter
            refetch={this.props.data.refetch}
            count={this.props.data && this.props.data.searchArticles && this.props.data.searchArticles.content.length}
          />
        )}
        {!this.props.recentArticlesFeed && <Divider />}
        {this.props.data &&
        this.props.data.searchArticles &&
        Array.isArray(this.props.data.searchArticles.content) &&
        this.props.data.searchArticles.content.length > 4 ? (
            this.props.data.searchArticles.content
              .filter((article, i, articles) => {
                if (articles.length > 4 && i >= 4) {
                  return article
                }
              })
              .map(
                (article, index, articles) =>
                  index !== articles.length - 1 ? (
                    <div key={`${article.article_id}-${article.article_version}`}>
                      <CategoryArticle
                        key={`${article.article_id}-${article.article_version}`}
                        {...article}
                        ethUsdPrice={ethUsdPrice}
                        routeChangeAction={routeChangeAction}
                      />
                      <Divider />
                    </div>
                  ) : (
                    <CategoryArticle
                      key={`${article.article_id}-${article.article_version}`}
                      {...article}
                      ethUsdPrice={ethUsdPrice}
                      routeChangeAction={routeChangeAction}
                    />
                  )
              )
          ) : (
            <p>No articles found.</p>
          )}
      </CategoryArticles.Container>
    )
  }
}

export default CategoryArticles
