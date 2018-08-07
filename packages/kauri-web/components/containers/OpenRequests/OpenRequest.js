// @flow
import React from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { Link } from '../../../routes'
import DescriptionRow from '../Requests/DescriptionRow'
import DatePosted from '../../common/DatePosted'
import theme from '../../../lib/theme-config'
import Web3 from 'web3'
import { Badge } from '../../common/ActionBadge'

const web3 = new Web3()

type Props = {
  request: RequestDTO,
  ethUsdPrice: number,
  routeChangeAction: string => void,
}

let OpenRequest: any = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`
export const CategoryAvatar = styled.img`
  max-height: ${props => props.height || '35'}px;
  max-width: 55px;
`
const Details = styled.div`
  width: 65%;
`
const Header = styled.div`
  display: flex;
`

const smallerSubject = css`
  font-size: 14px;
  line-height: 18px;
`

export const Subject = styled.a`
  font-size: ${props => (props.type === 'topicHomepage' ? '20px' : '18px')};
  font-weight: 500;
  line-height: 24px;
  ${props => props.recentRequest && smallerSubject};
  line-height: ${props => props.type === 'topicHomepage' && 'initial !important'};
`

const CommentsNumber = styled.strong`
  display: block;
`

const Deadline = DatePosted.extend`
  > :last-child {
    text-transform: none;
  }
`
const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`
const Content = styled.div`
  display: flex;
  height: 70%;
  flex-direction: column;
`
const Badges = Details.extend`
  display: flex;
  width: 30%;
  margin-left: auto;
  justify-content: space-between;
`

const Dates = styled.div`
  display: flex;
  margin-top: auto;
  > :last-child {
    margin-left: 50px;
  }
`

const profileTypeCategoryBadgeCss = css`
  cursor: initial;
  :hover {
    border: 1px solid ${props => props.theme && props.theme[props.category] && props.theme[props.category].borderColor} !important;
  }
`

export const CategoryBadge = styled.div`
  display: flex;
  margin-right: 24px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 76px;
  width: 76px;
  border: 1px solid ${props => props.theme && props.theme[props.category] && props.theme[props.category].borderColor};
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  :hover {
    border: 2px solid ${props => props.theme.primaryColor} !important;
  }
  ${props => props.type === 'profile' && profileTypeCategoryBadgeCss};
`

export const CategoryName = styled.span`
  margin-top: 9px;
  height: 13px;
  width: 100px;
  word-break: break-word;
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  text-transform: uppercase;
`

export const DeadlineDate = styled.span`
  font-size: 13px;
  font-weight: 300;
  line-height: 18px;
`

const RestrictToOneLine = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const PostedDate = DeadlineDate.extend``

OpenRequest.Details = Details
OpenRequest.Badges = Badges
OpenRequest.Badge = Badge
OpenRequest.Header = Header
OpenRequest.DatePosted = DatePosted
OpenRequest.Subject = Subject
OpenRequest.Content = Content
OpenRequest.CommentsNumber = CommentsNumber
OpenRequest.CategoryAvatar = CategoryAvatar
OpenRequest.Text = Text
OpenRequest.Dates = Dates
OpenRequest.Deadline = Deadline
OpenRequest.DeadlineDate = DeadlineDate
OpenRequest.PostedDate = PostedDate
OpenRequest.CategoryBadge = CategoryBadge
OpenRequest.CategoryName = CategoryName

export default ({
  ethUsdPrice,
  routeChangeAction,
  request: {
    request_id,
    bounty,
    date_created,
    text,
    status,
    category,
    subject,
    comments,
    total_flag,
    dead_line,
    total_submissions,
  },
}: Props) => (
  <OpenRequest>
    <OpenRequest.CategoryBadge
      category={category}
      theme={theme}
      onClick={() => routeChangeAction(`/request/${request_id}`)}
    >
      <OpenRequest.CategoryAvatar src={`/static/images/${category}/avatar.png`} alt='logo' />
      <OpenRequest.CategoryName>{category}</OpenRequest.CategoryName>
    </OpenRequest.CategoryBadge>
    <OpenRequest.Details>
      <RestrictToOneLine>
        <Link route={`/request/${request_id}`}>
          <OpenRequest.Subject href={`/request/${request_id}`}>
            {typeof text === 'string' && text.includes('https://beta.bounties.network/bounty/') ? '🌟' : ''}
            {subject}
          </OpenRequest.Subject>
        </Link>
      </RestrictToOneLine>
      <OpenRequest.Content>
        <OpenRequest.Text>
          <DescriptionRow openRequest record={{ text }} />
        </OpenRequest.Text>
        <OpenRequest.Dates>
          <OpenRequest.DatePosted>
            <span>POSTED</span>
            <strong>{`${moment(date_created).format('DD/MM/YYYY')}`}</strong>
          </OpenRequest.DatePosted>
          <OpenRequest.Deadline>
            <span>EXPIRE{moment(dead_line).isBefore() ? 'D' : 'S'}</span>
            <strong>{`${moment(dead_line).fromNow()} ${moment(dead_line).format('(DD MMM YYYY)')}`}</strong>
          </OpenRequest.Deadline>
        </OpenRequest.Dates>
      </OpenRequest.Content>
    </OpenRequest.Details>
    <OpenRequest.Badges>
      <OpenRequest.Badge>
        <strong>{total_flag}</strong>
        {(status !== 'CLOSED' || status !== 'CANCELLED' || status !== 'CANCELLATION_IN_PROGRESS') && (
          <strong>{typeof status === 'string' && status.replace(/_/g, ' ')}</strong>
        )}
      </OpenRequest.Badge>
      <OpenRequest.Badge>
        <strong>{total_submissions}</strong>
        <strong>SUBMISSIONS</strong>
      </OpenRequest.Badge>
      <OpenRequest.Badge>
        <strong>{comments.length}</strong>
        <strong>COMMENTS</strong>
      </OpenRequest.Badge>
      <OpenRequest.Badge>
        <strong>{`${web3.fromWei(bounty, 'ether')} ETH`}</strong>
        <strong>{`$${(web3.fromWei(bounty, 'ether') * ethUsdPrice || 0).toFixed(2)}`}</strong>
      </OpenRequest.Badge>
    </OpenRequest.Badges>
  </OpenRequest>
)
