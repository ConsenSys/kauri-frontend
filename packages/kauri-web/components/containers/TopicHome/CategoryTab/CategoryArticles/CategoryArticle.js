// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from '../../../../../routes'
import { CategoryBadge, CategoryAvatar, CategoryName, Subject } from '../../../OpenRequests/OpenRequest'
import CategoryBreadcrumbs from '../../../../common/CategoryBreadcrumbs'
import {
  SubmittedArticle as Container,
  Details,
  Content,
  Header,
  Contributions,
} from '../../../SubmittedArticles/SubmittedArticle'
import DatePosted from '../../../../common/DatePosted'
import DescriptionRow from '../../../../common/DescriptionRow'
import theme from '../../../../../lib/theme-config'
import Web3 from 'web3'

const web3 = new Web3()

type Props = { ethUsdPrice: number, routeChangeAction: string => void } & ArticleDTO

const TopicArticleBadge = CategoryBadge.extend`
  height: 120px;
  width: 120px;
  cursor: pointer;
  :hover {
    border: 2px solid ${props => props.theme.hoverTextColor};
  }
`

const CategoryArticle = Container.extend`
  flex-direction: row;
`

const MetaDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  > :last-child {
    margin-left: 20px;
  }
`

const RestrictToOneLine = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CategoryArticleDatePosted = DatePosted.extend`
  margin-left: auto;
`

export default ({
  routeChangeAction,
  sub_category,
  category,
  article_id,
  article_version,
  subject,
  tip,
  text,
  date_updated,
  ethUsdPrice,
  user,
}: Props) => (
  <CategoryArticle>
    <TopicArticleBadge
      onClick={() => routeChangeAction(`/article/${article_id}/article-version/${article_version}`)}
      category={category}
      theme={theme}
    >
      {!category && <CategoryName>{(user && user.username) || 'Unknown Writer'}</CategoryName>}
      {category && <CategoryAvatar height={46} src={`/static/images/${category}/avatar.png`} alt='logo' />}
    </TopicArticleBadge>
    <Details categoryArticle>
      <Header>
        <RestrictToOneLine>
          <Link route={`/article/${article_id}/article-version/${article_version}`}>
            <Subject href={`/article/${article_id}/article-version/${article_version}`} type='topicHomepage'>
              {subject}
            </Subject>
          </Link>
        </RestrictToOneLine>
        <CategoryArticleDatePosted>
          <span>POSTED</span>
          <strong>{moment(date_updated).fromNow()}</strong>
        </CategoryArticleDatePosted>
      </Header>
      <Content>
        <DescriptionRow record={{ text }} />
      </Content>
      <MetaDetails>
        <CategoryBreadcrumbs category={category} sub_category={sub_category} />
        <Contributions>
          <span>Contributions</span>
          <strong>{`${web3.fromWei(tip || 0, 'ether')} ETH $${(web3.fromWei(tip || 0, 'ether') * ethUsdPrice).toFixed(
            2
          )}`}</strong>
        </Contributions>
      </MetaDetails>
    </Details>
  </CategoryArticle>
)
