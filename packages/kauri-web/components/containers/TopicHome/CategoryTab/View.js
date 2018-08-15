// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { TopicsHeader as CategoryHeader } from '../../Topics/TopicsHeader'
import { OpenRequestsHeader } from '../../OpenRequests/View'
import CategoryArticles from './CategoryArticles'
import NewArticle from './NewArticle'
import RecentRequests from '../../RecentRequests'
import theme from '../../../../lib/theme-config'

type Props = {
  category: string,
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>,
    },
  },
  routeChangeAction: string => void,
}

const Label = styled.strong`
  color: white;
  text-transform: uppercase;
`

export const Indicator = CategoryHeader.Indicator.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  width: 96px;
  border-radius: 4px;
  background-color: white;
  margin-left: 0px;
  margin-right: 0px;
  > :first-child { margin 0px; }
`

export const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :not(:first-child) {
    margin-top: 10px;
  }
`

export const IndicatorLink = styled.a`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`

export const Container = CategoryHeader.Container.extend`
  height: 231px;
  background-color: ${props => props.theme.secondaryColor};
`

const NewArticlesContainer = styled.section`
  height: 421px;
  background-color: ${props => props.theme.tertiaryBackgroundColor};
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const NewArticlesHeader = OpenRequestsHeader.extend`
  margin-top: 0px;
  margin-bottom: 30px;
  color: ${props => props.theme.primaryTextColor};
  font-size: 20px;
  font-weight: 500;
  line-height: 22px;
`

const NewArticles = styled.section`
  display: flex;
  margin-top: 20px;
  > :first-child {
    padding-left: 0px !important;
  }
`

const ContentContainer = styled.section`
  display: flex;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  > :first-child {
    width: 75%;
  }
  > :last-child {
    width: 25%;
  }
`

class CategoryTab extends Component<Props> {
  static Container = Container
  static Indicator = Indicator
  static IndicatorContainer = IndicatorContainer
  static IndicatorLink = IndicatorLink
  static Label = Label
  static NewArticles = NewArticles
  static NewArticlesContainer = NewArticlesContainer
  static NewArticlesHeader = NewArticlesHeader
  static NewArticle = NewArticle
  static ContentContainer = ContentContainer
  static CategoryArticles = CategoryArticles
  static RecentRequests = RecentRequests

  render () {
    const { category, routeChangeAction } = this.props

    return (
      <section>
        <CategoryTab.Container categoryTab chosenCategory={category}>
          <CategoryHeader.Indicators>
            <CategoryTab.IndicatorContainer>
              <CategoryTab.Indicator>
                <CategoryHeader.Icon src={`/static/images/${category}/avatar.png`} />
              </CategoryTab.Indicator>
              <CategoryTab.Label>{category}</CategoryTab.Label>
              <CategoryTab.IndicatorLink href={theme[category].homepageURL}>
                {theme[category].homepageURL}
              </CategoryTab.IndicatorLink>
            </CategoryTab.IndicatorContainer>
          </CategoryHeader.Indicators>
        </CategoryTab.Container>
        <CategoryTab.NewArticlesContainer>
          <CategoryTab.NewArticles>
            {typeof this.props.data.searchArticles === 'object' ? (
              this.props.data.searchArticles.content.length > 0 ? (
                this.props.data.searchArticles.content.map(article => (
                  <CategoryTab.NewArticle
                    key={`${article.article_id}-${article.article_version}`}
                    {...article}
                    routeChangeAction={routeChangeAction}
                    categoryTab
                  />
                ))
              ) : (
                <p>No new articles.</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </CategoryTab.NewArticles>
        </CategoryTab.NewArticlesContainer>
        <CategoryTab.ContentContainer>
          <CategoryTab.CategoryArticles category={category} />
          <CategoryTab.RecentRequests category={category} />
        </CategoryTab.ContentContainer>
      </section>
    )
  }
}

export default CategoryTab
