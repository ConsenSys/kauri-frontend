// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from '../../../routes'
import theme from '../../../lib/theme-config'
import { CategoryBadge, CategoryAvatar, CategoryName, Subject } from '../OpenRequests/OpenRequest'
import DatePosted from '../../common/DatePosted'
import { Details as MetaDetails } from '../SubmittedArticles/OriginalRequest/View'
import { Badge } from '../../common/ActionBadge'

import type { ApproveArticlePayload } from '../Article/Module'

type Props = {
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
} & ArticleDTO

const Approval = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  > :first-child {
    margin-bottom: 15px;
  }
`

const Dates = MetaDetails

const Content = styled.div``

const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`

export const Badges = styled.div`
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

const ApprovalBadges = Badges.extend`
  > :not(:first-child) {
    margin-left: 65px;
  }
`

Approval.CategoryAvatar = CategoryAvatar
Approval.Details = Details
Approval.Subject = Subject
Approval.Content = Content
Approval.Text = Text
Approval.Dates = Dates
Approval.DatePosted = DatePosted
Approval.Badges = ApprovalBadges
Approval.Badge = Badge
Approval.CategoryBadge = CategoryBadge
Approval.CategoryName = CategoryName
Approval.CategoryAvatar = CategoryAvatar

const Username = styled.strong`
  color: ${props => props.theme.primaryColor};
`

export default (props: Props) => (
  <Approval key={`${props.article_id}-${props.article_version}`}>
    <Approval.CategoryBadge
      onClick={() => props.routeChangeAction(`/article/${props.article_id}/article-version/${props.article_version}`)}
      category={props.category}
      theme={theme}
    >
      <Approval.CategoryAvatar src={`/static/images/${props.category}/avatar.png`} alt='logo' />
      <Approval.CategoryName>{props.category}</Approval.CategoryName>
    </Approval.CategoryBadge>
    <Approval.Details>
      <Link route={`/article/${props.article_id}/article-version/${props.article_version}`}>
        <Approval.Subject href={`/article/${props.article_id}/article-version/${props.article_version}`}>
          {props.subject}
        </Approval.Subject>
      </Link>
      <Approval.Content type='approval'>
        <Approval.Dates>
          <Approval.DatePosted>
            <span>SUBMITTED</span>
            <strong>
              {`${moment(props.date_updated).fromNow()} ${moment(props.date_updated).format('(DD MMM YYYY)')}`}
            </strong>
          </Approval.DatePosted>
          <Approval.DatePosted>
            <span>WRITTEN BY</span>
            <Username>{(props.user && props.user.username) || 'Unknown writer'}</Username>
          </Approval.DatePosted>
        </Approval.Dates>
      </Approval.Content>
    </Approval.Details>
    <Approval.Badges>
      <Approval.Badge>
        <strong>{typeof props.status === 'string' && props.status.replace(/_/g, ' ').toLowerCase()}</strong>
        <strong>STATUS</strong>
      </Approval.Badge>
    </Approval.Badges>
  </Approval>
)
