// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { TopicsHeader as CategoryHeader } from '../Topics/TopicsHeader'
import CategoryTab from '../TopicHome/CategoryTab/View'

type Props = {
  category: string,
  defaultTab?: string,
  data: { searchArticles?: ?{ totalElements: number } },
  routeChangeAction: string => void,
}

type State = {}

class Help extends Component<Props, State> {
  render () {
    const {
      category,
      data: { searchArticles },
      routeChangeAction,
    } = this.props

    return (
      <section>
        <Helmet>
          <title>Beginner to Advanced Blockchain & Ethereum Tutorials | Help - Kauri</title>
          <meta
            name="description"
            content="Discover the best blockchain related articles, tutorials and how-to guides"
          />
          <link
            rel="canonical"
            href={`https://${this.props.hostName}/collections`}
          />
        </Helmet>
        <CategoryTab.Container chosenCategory={category} categoryTab>
          <CategoryHeader.Indicators>
            <CategoryTab.IndicatorContainer>
              <CategoryTab.Indicator>
                <CategoryHeader.Icon src={`/static/images/help-logo.svg`} />
              </CategoryTab.Indicator>
              <CategoryTab.Label>{category}</CategoryTab.Label>
            </CategoryTab.IndicatorContainer>
          </CategoryHeader.Indicators>
        </CategoryTab.Container>
        <CategoryTab.NewArticlesContainer>
          <CategoryTab.NewArticles>
            {typeof this.props.data.searchArticles === 'object' ? (
              this.props.data.searchArticles.content.length > 0 ? (
                this.props.data.searchArticles.content.map(article => (
                  <CategoryTab.NewArticle key={article.article_id} {...article} routeChangeAction={routeChangeAction} />
                ))
              ) : (
                <p>No articles written.</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </CategoryTab.NewArticles>
        </CategoryTab.NewArticlesContainer>
      </section>
    )
  }
}

export default Help
