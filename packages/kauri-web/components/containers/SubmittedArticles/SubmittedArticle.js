// @flow
import React, { Component, Fragment } from 'react'
import { Divider } from 'antd'
import moment from 'moment'
import Web3 from 'web3'
import styled, { css } from 'styled-components'
import { Link } from '../../../routes'
import DescriptionRow from '../Requests/DescriptionRow'
import theme from '../../../lib/theme-config'
import {
  CategoryBadge as OpenRequestCategoryBadge,
  CategoryName,
  CategoryAvatar,
  Subject,
} from '../OpenRequests/OpenRequest'
import DatePosted from '../../common/DatePosted'
import { Badge } from '../../common/ActionBadge'
import OriginalRequest from './OriginalRequest'

import type { ApproveArticlePayload } from '../Article/Module'

const web3 = new Web3()

export let SubmittedArticle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const personalSubmittedArticleWidth = css`
  padding-left: 20px;
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.categoryArticle && '85%') || '75%'};
  width: ${props =>
    (props.type === 'approval' ||
      props.type === 'personal' ||
      props.type === 'approved' ||
      props.type === 'published') &&
    '60%'};
  ${props => props.userId && personalSubmittedArticleWidth};
`

export const Header = styled.div`
  display: flex;
`

export const WrittenBy = DatePosted

export const Contributions = DatePosted

const CommentsNumber = styled.strong`
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${props => props.theme.primaryTextColor};
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  text-transform: capitalize;
`

const Comments = styled.div`
  text-align: center;
  > :last-child {
    color: ${props => props.theme.primaryTextColor};
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    text-transform: uppercase;
  }
`

export const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.type === 'with request' && 'padding-top: 10px'};
  height: ${props =>
    (props.type === 'with request' ||
      props.type === 'approval' ||
      props.type === 'personal' ||
      props.type === 'published' ||
      props.type === 'approved') &&
    '100%'};
`

const Badges = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-end;
  > :not(:first-child) {
    margin-left: 80px;
  }
  > div {
    margin-right: 0px;
  }
`

const CategoryBadge = OpenRequestCategoryBadge.extend`
  height: 120px;
  width: 120px;
  margin-right: 0px;
`
const MetaDetails = Header.extend`
  margin-top: auto;
  > :not(:first-child) {
    margin-left: 30px;
  }
`

const StatusDetails = MetaDetails.extend`
  margin: auto 0;
  > :not(:first-child) {
    margin-left: 80px;
  }
`

const SubmittedArticleDetails = styled.div`
  display: flex;
  width: 100%;
`

const Username = styled.strong`
  color: ${props => props.theme.primaryColor};
`

SubmittedArticle = Object.assign(SubmittedArticle, {
  Details,
  Header,
  DatePosted,
  Subject,
  Content,
  CommentsNumber,
  Text,
  Comments,
  CategoryBadge,
  CategoryName,
  CategoryAvatar,
  Contributions,
  WrittenBy,
  MetaDetails,
  SubmittedArticleDetails,
  OriginalRequest,
  StatusDetails,
})

type Props = {
  article: ArticleDTO,
  ethUsdPrice: number,
  userId?: string,
  routeChangeAction: string => void,
  approveArticleAction?: ApproveArticlePayload => void,
}

export default ({
  ethUsdPrice,
  routeChangeAction,
  article: {
    article_id,
    article_version,
    date_updated,
    comments,
    date_created,
    text,
    status,
    category,
    subject,
    tip,
    request_id,
    user,
    content_hash,
  },
  userId,
  categoryTab,
  type,
  approveArticleAction,
}: Props) => (
  <SubmittedArticle>
    <SubmittedArticle.SubmittedArticleDetails>
      <SubmittedArticle.CategoryBadge
        onClick={() => routeChangeAction(`/article/${article_id}/article-version/${article_version}`)}
        category={category}
        theme={theme}
      >
        {category && <SubmittedArticle.CategoryAvatar src={`/static/images/${category}/avatar.png`} alt='logo' />}
        <SubmittedArticle.CategoryName>
          {category || (user && user.username) || (user && user.user_id)}
        </SubmittedArticle.CategoryName>
      </SubmittedArticle.CategoryBadge>
      <SubmittedArticle.Details type={type} userId={userId} categoryTab={categoryTab}>
        <SubmittedArticle.Content type={type}>
          <SubmittedArticle.Header>
            <Link route={`/article/${article_id}/article-version/${article_version}`}>
              <SubmittedArticle.Subject href={`/article/${article_id}/article-version/${article_version}`}>
                {subject}
              </SubmittedArticle.Subject>
            </Link>
          </SubmittedArticle.Header>
          <DescriptionRow record={{ text }} />
          <SubmittedArticle.MetaDetails>
            <SubmittedArticle.DatePosted>
              <span>POSTED</span>
              <strong>{moment(date_updated).format('DD/MM/YYYY')}</strong>
            </SubmittedArticle.DatePosted>
            <SubmittedArticle.WrittenBy
              type='written by'
              onClick={() => routeChangeAction(`/public-profile/${user && user.user_id}`)}
            >
              <span>Written by</span>
              <Username>{(user && user.username) || user.user_id}</Username>
            </SubmittedArticle.WrittenBy>
            {type !== 'approval' && (
              <SubmittedArticle.Contributions>
                <span>Contributions</span>
                <strong>{`${web3.fromWei(tip || 0, 'ether')} ETH $${(
                  web3.fromWei(tip || 0, 'ether') * ethUsdPrice
                ).toFixed(2) || 0}`}</strong>
              </SubmittedArticle.Contributions>
            )}
          </SubmittedArticle.MetaDetails>
        </SubmittedArticle.Content>
      </SubmittedArticle.Details>
      <Badges>
        {status !== 'APPROVED' || status !== 'PRE_APPROVED' ? (
          <Badge>
            <strong>{typeof status === 'string' && status.replace(/_/g, ' ').toLowerCase()}</strong>
            <strong>Status</strong>
          </Badge>
        ) : (
          <p>{status}</p>
        )}
        {type !== 'approval' &&
          status !== 'PUBLISHED' &&
          (status !== 'APPROVED' && (
            <Badge>
              <strong>{Array.isArray(comments) ? comments.length.toString() : 0}</strong>
              <span>Comments</span>
            </Badge>
          ))}
      </Badges>
    </SubmittedArticle.SubmittedArticleDetails>
    <Divider style={typeof request_id === 'string' ? { width: 'calc(100% - 140px)', marginLeft: 140 } : {}} />
    {typeof request_id === 'string' && (
      <Fragment>
        <SubmittedArticle.OriginalRequest request_id={request_id} />
        <Divider />
      </Fragment>
    )}
  </SubmittedArticle>
)
