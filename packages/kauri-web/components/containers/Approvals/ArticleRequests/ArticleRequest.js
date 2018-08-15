// @flow
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { Divider } from 'antd'
import ArticleRequestSubmissions from './ArticleRequestSubmissions'
import { Link } from '../../../../routes'
import { Subject } from '../../OpenRequests/OpenRequest'
import DatePosted from '../../../common/DatePosted'
import { Details as Dates } from '../../SubmittedArticles/OriginalRequest/View'
import { Badges } from '../Approval'
import { Badge } from '../../../common/ActionBadge'

const RequestContainer = styled.div`
  display: flex;
  min-height: 80px;
`

const rotate90DegreesCss = css`
  transform: rotate(-90deg);
`

const ShowArticleSubmissionsArrow = styled.img`
  width: 18px;
  height: 12px;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  ${props => !props.showArticleRequestSubmissions && rotate90DegreesCss};
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-left: 40px;
  > :nth-child(2) {
    margin: 15px 0px;
  }
`

export const ArticleRequestLabel = styled.h5`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: ${props => props.theme.secondaryTextColor};
  text-transform: uppercase;
`

const ArticleRequestSubject = Subject.extend`
  font-size: 16px;
`

const Request = ({
  user_id,
  request_id,
  date_created,
  subject,
  text,
  category,
  total_flag,
  dead_line,
  total_submissions,
  status,
  toggleArticleRequestSubmissions,
  showArticleRequestSubmissions,
}: {
  toggleArticleRequestSubmissions: () => void,
  showArticleRequestSubmissions: boolean,
} & RequestDTO) => (
  <RequestContainer>
    <ShowArticleSubmissionsArrow
      showArticleRequestSubmissions={showArticleRequestSubmissions}
      onClick={toggleArticleRequestSubmissions}
      alt='show-articles-arrow'
      src={'/static/images/request-down-arrow.png'}
    />
    <Details>
      <ArticleRequestLabel>Original Request</ArticleRequestLabel>
      <Link route={`/request/${request_id}`}>
        <ArticleRequestSubject href={`/request/${request_id}`}>{subject}</ArticleRequestSubject>
      </Link>
      <Dates>
        <DatePosted>
          <span>TIME LEFT FOR APPROVAL</span>
          <strong>
            {moment(dead_line)
              .add(2, 'days')
              .fromNow(true)}
            {moment(dead_line)
              .add(2, 'days')
              .diff(Date.now(), 'days') <= 2 && ' ❗'}
          </strong>
        </DatePosted>
      </Dates>
    </Details>
    <Badges>
      <Badge>
        <strong>{total_flag}</strong>
        <strong>IN PROGRESS</strong>
      </Badge>
      <Badge>
        <strong>{total_submissions}</strong>
        <strong>SUBMISSIONS</strong>
      </Badge>
    </Badges>
  </RequestContainer>
)

const ArticleRequestContainer = styled.section``

type Props = { request: RequestDTO }
type State = { showArticleRequestSubmissions: boolean, allArticlesRejected: boolean }
export default class ArticleRequest extends React.Component<Props, State> {
  state = {
    showArticleRequestSubmissions: true,
    allArticlesRejected: false,
  }

  toggleArticleRequestSubmissions = () =>
    this.setState({ showArticleRequestSubmissions: !this.state.showArticleRequestSubmissions })

  allArticlesAreRejected = () => this.setState({ ...this.state, allArticlesRejected: true })

  render () {
    const { request } = this.props

    return (
      <ArticleRequestContainer>
        {!this.state.allArticlesRejected ? (
          <Fragment>
            <Request
              showArticleRequestSubmissions={this.state.showArticleRequestSubmissions}
              toggleArticleRequestSubmissions={this.toggleArticleRequestSubmissions}
              {...request}
            />
            {this.state.showArticleRequestSubmissions && <Divider style={{ width: 1165, marginLeft: 100 }} />}
            {this.state.showArticleRequestSubmissions && (
              <ArticleRequestSubmissions
                allArticlesAreRejected={this.allArticlesAreRejected}
                request_id={request.request_id}
              />
            )}
            <Divider />
          </Fragment>
        ) : (
          <p>No articles with requests to approve. Inbox Zero!</p>
        )}
      </ArticleRequestContainer>
    )
  }
}
