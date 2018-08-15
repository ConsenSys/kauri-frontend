// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Link } from '../../../../routes'
import theme from '../../../../lib/theme-config'
import { CategoryBadge } from '../../../common/ActionBadge'
import { Subject } from '../../OpenRequests/OpenRequest'
import DescriptionRow from '../../Requests/DescriptionRow'
import { ArticleRequestLabel } from '../../Approvals/ArticleRequests/ArticleRequest'

const TopicContainer = styled.section``

type Props = {
  category: string,
  routeChangeAction: string => void,
  data: {
    loading: boolean,
    searchArticles?: { content?: ArticleDTO },
  },
}

const WidgetContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 80px ${props => props.theme.padding};
`

const Topic = {
  Container: TopicContainer,
  WidgetContainer,
}

const Header = ArticleRequestLabel.extend`
  margin-bottom: 15px;
`

const ArticleBadge = styled.div`
  align-items: inherit;
  margin-left: 0;
  width: 293px;
  > :first-child {
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    color: ${props => props.theme.primaryColor};
  }
  *:not(:first-child) {
    color: ${props => props.theme.secondaryColor};
  }
`

const Text = styled.span``

ArticleBadge.Subject = Subject

ArticleBadge.Text = Text

const RestrictToTwoLines = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const RecentArticle = (article: ArticleDTO) => (
  <ArticleBadge>
    <RestrictToTwoLines>
      <Link route={`/article/${article.article_id}/article-version/${article.article_version}`}>
        <ArticleBadge.Subject
          href={`/article/${article.article_id}/article-version/${article.article_version}`}
          type='topicHomepage'
        >
          {article.subject}
        </ArticleBadge.Subject>
      </Link>
    </RestrictToTwoLines>
    <DescriptionRow record={{ text: article.text }} />
  </ArticleBadge>
)

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  > div:nth-child(2) {
    margin-left: 30px;
  }
  > div:last-child {
    padding-left: 65px;
  }
`

const Articles = styled.div`
  display: flex;
  flex-direction: column;
`

const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.h2`
  font-size: 40px;
  font-weight: 300;
  line-height: 53px;
  margin-bottom: 0px;
`

const ViewAll = styled.a`
  font-weight: 700;
  font-size: 12px;
`

const Count = ({ count, category }: { count: ?number, category: string }) => (
  <Count.Container>
    <Count.Label>{`${count} Articles`}</Count.Label>
    <Link route={`/community/${category}`}>
      <ViewAll href={`/community/${category}`}>VIEW ALL</ViewAll>
    </Link>
  </Count.Container>
)

Count.Container = CountContainer
Count.Label = Label

const RecentArticles = {
  Header,
  ArticlesContainer,
  Count,
  CategoryBadge,
  Articles,
}

const renderArticles = (
  articles?: { content?: Array<?ArticleDTO> },
  category: string,
  routeChangeAction: string => void
) => (
  <Topic.WidgetContainer>
    <RecentArticles.CategoryBadge
      onClick={() => routeChangeAction(`/community/${category}`)}
      theme={theme}
      category={category}
      height='120'
      width='290'
      avatarHeight='48'
      avatarWidth='52'
    />
    <RecentArticles.Articles>
      {articles &&
        articles.content &&
        articles.content.length > 0 && <RecentArticles.Header>RECENT ARTICLES</RecentArticles.Header>}
      <RecentArticles.ArticlesContainer>
        {articles && articles.content && articles.content.length > 0 ? (
          articles.content.map(article => (
            <RecentArticle key={`${article.article_id}-${article.article_version}`} {...article} />
          ))
        ) : (
          <p>No recent articles.</p>
        )}
        {articles &&
          articles.content &&
          articles.content.length > 0 && (
            <RecentArticles.Count count={articles && articles.totalElements} category={category} />
          )}
      </RecentArticles.ArticlesContainer>
    </RecentArticles.Articles>
  </Topic.WidgetContainer>
)

export default ({ category, data, routeChangeAction }: Props) => (
  <Topic.Container>
    {data.loading ? <p>Loading</p> : renderArticles(data.searchArticles, category, routeChangeAction)}
  </Topic.Container>
)
