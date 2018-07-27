// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import TopicsHeader, { TopicsHeader as CategoryHeader } from '../Topics/TopicsHeader'
import { OpenRequestsHeader } from '../OpenRequests/View'
import CategoryArticles from '../TopicHome/CategoryTab/CategoryArticles'
import NewArticle from '../TopicHome/CategoryTab/NewArticle'
import RecentCategoryArticle from './RecentCategoryArticle'
import RecentCategoryRequests from './RecentCategoryRequests'
import TotalArticleBadge from '../TotalArticleBadge'
import RecentArticlesFeed from './RecentArticlesFeed'
// import MyComponent from '../../../../kauri-components/components/Hello/Index.bs.js'

type Props = {
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>
    }
  },
  routeChangeAction: string => void
}

const Label = styled.strong`
  color: white;
  text-transform: uppercase;
`

const Indicator = CategoryHeader.Indicator.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  width: 96px;
  border-radius: 4px;
  background-color: white;
  margin-left: 0px;
  > :first-child { margin-bottom: 0px; }
`

const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :not(:first-child) {
    margin-top: 10px;
  }
`

const IndicatorLink = styled.a`
  color: ${props => props.theme.primaryColor};
  font-size: 13px;
  font-weight: bold;
`

const Container = CategoryHeader.Container.extend`
  height: 231px;
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
    padding-left: 0px;
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

const RecentCategoryArticles = styled.section`
  display: flex;
  margin-left: -15px;
  margin-right: 15px;
  flex-wrap: wrap;
  > div {
    margin-bottom: 30px;
  }
`

const CategoryArticleContent = styled.section``

class Homepage extends Component<Props> {
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
  static RecentCategoryRequests = RecentCategoryRequests
  static RecentCategoryArticles = RecentCategoryArticles
  static RecentCategoryArticle = RecentCategoryArticle
  static CategoryArticleContent = CategoryArticleContent
  static CategoryArticleBadges = RecentCategoryArticles
  static TotalArticleBadge = TotalArticleBadge
  static RecentArticlesFeed = RecentArticlesFeed
  static IntroBanner = TopicsHeader

  render() {
    return (
      <section>
        {/* <MyComponent /> */}
        <Homepage.IntroBanner />
        <Homepage.NewArticlesContainer>
          <Homepage.NewArticles>
            {typeof this.props.data.searchArticles === 'object' ? (
              this.props.data.searchArticles.content.length > 0 ? (
                this.props.data.searchArticles.content.map(article => (
                  <Homepage.NewArticle
                    key={article.article_id}
                    {...article}
                    routeChangeAction={this.props.routeChangeAction}
                  />
                ))
              ) : (
                <p>No articles written.</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </Homepage.NewArticles>
        </Homepage.NewArticlesContainer>
        <Homepage.ContentContainer>
          <Homepage.CategoryArticleContent>
            <Homepage.RecentArticlesFeed recentArticlesFeed />
          </Homepage.CategoryArticleContent>
          <Homepage.RecentCategoryRequests recentCategoryRequests size={6} />
        </Homepage.ContentContainer>
      </section>
    )
  }
}

export default Homepage
