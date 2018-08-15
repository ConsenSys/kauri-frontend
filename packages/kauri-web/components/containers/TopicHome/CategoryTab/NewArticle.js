// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { Subject, CategoryName } from '../../OpenRequests/OpenRequest'
import DescriptionRow from '../../../common/DescriptionRow'
import { Link } from '../../../../routes'
import theme from '../../../../lib/theme-config'
import { CategoryBadge, Avatar } from '../../../common/ActionBadge'
import CategoryBreadcrumbs from '../../../common/CategoryBreadcrumbs'
import CollectionCard from '../../../../../kauri-components/components/Card/CollectionCard.bs'

type Props = {
  data?: {
    searchArticles: {
      content: Array<?ArticleDTO>,
    },
  },
  routeChangeAction: string => void,
} & ArticleDTO

const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 170px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme[props.category] && props.theme[props.category].borderColor};
  cursor: pointer;
  margin-bottom: 7px;
  :hover {
    border: 2px solid ${props => props.theme.hoverTextColor};
  }
`

const RestrictToTwoLines = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`

const Submitted = styled.strong`
  margin-left: auto;
  color: ${props => props.theme.primaryTextColor};
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
`

const Details = ({ category, submitted, sub_category }: *) => (
  <DetailsContainer>
    <CategoryBreadcrumbs category={category} sub_category={sub_category} />
    <Submitted>{moment(submitted).fromNow()}</Submitted>
  </DetailsContainer>
)

const individualCategoryCss = css`
  width: 33.3%;
`

const NewArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 305px;
  width: 25%;
  padding: 0 15px;
  ${props => props.individualCategory && individualCategoryCss};
`

const Content = styled.div`
  padding-top: 7px;
`

export default (props: Props) =>
  typeof props.date_updated === 'string' ? (
    // <NewArticleContainer>
    //   <Link route={`/article/${props.article_id}/article-version/${props.article_version}`}>
    //     <Thumbnail theme={theme} category={props.category}>
    //       {!props.category && <CategoryName>{(props.user && props.user.username) || 'Unknown Writer'}</CategoryName>}
    //       {props.category && (
    //         <Avatar avatarWidth={70} avatarHeight={70} src={`/static/images/${props.category}/avatar.png`} alt='logo' />
    //       )}
    //     </Thumbnail>
    //   </Link>
    //   <RestrictToTwoLines>
    //     <Link route={`/article/${props.article_id}/article-version/${props.article_version}`}>
    //       <Subject href={`/article/${props.article_id}/article-version/${props.article_version}`} type='topicHomepage'>
    //         {props.subject}
    //       </Subject>
    //     </Link>
    //   </RestrictToTwoLines>
    //   <Content>
    //     <DescriptionRow record={{ text: props.text }} />
    //   </Content>
    //   <Details sub_category={props.sub_category} category={props.category} submitted={props.date_updated} />
    // </NewArticleContainer>

    <CollectionCard
      heading='hello'
      collectionName='hello'
      collectionDescription='hello'
      articles='1'
      lastUpdated='Today lolz'
    />
  ) : props.data.searchArticles && props.data.searchArticles.content && props.data.searchArticles.content.length > 0 ? (
    <NewArticleContainer individualCategory>
      <CategoryBadge
        individualCategory
        height='120'
        width='290'
        avatarHeight='48'
        avatarWidth='52'
        theme={theme}
        category={props.category}
        username={props.user && props.user.username}
        userId={props.user && props.user.user_id}
        onClick={() =>
          props.routeChangeAction(
            `/article/${props.data.searchArticles.content[0].article_id}/article-version/${
              props.data.searchArticles.content[0].article_version
            }`
          )
        }
      />
      <Details
        sub_category={props.sub_category}
        category={props.category}
        submitted={props.data.searchArticles.content[0].date_updated}
      />
      <Link
        route={`/article/${props.data.searchArticles.content[0].article_id}/article-version/${
          props.data.searchArticles.content[0].article_version
        }`}
      >
        <Subject
          href={`/article/${props.data.searchArticles.content[0].article_id}/article-version/${
            props.data.searchArticles.content[0].article_version
          }`}
          type='topicHomepage'
        >
          {props.data.searchArticles.content[0].subject}
        </Subject>
      </Link>
      <Content>
        <DescriptionRow record={{ text: props.data.searchArticles.content[0].text }} />
      </Content>
    </NewArticleContainer>
  ) : (
    <p>No new articles.</p>
  )
