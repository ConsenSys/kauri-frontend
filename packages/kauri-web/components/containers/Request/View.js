// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Button, Row, Col, Divider } from 'antd'
import Web3 from 'web3'
import moment from 'moment'
import CommentDetails from './CommentDetails'
import Comment from './Comment'
import SubmitQuestion from './SubmitQuestion'
import theme from '../../../lib/theme-config'
import DescriptionRow from '../Requests/DescriptionRow'
import { Mask } from '../CreateRequestForm/CreateRequestHeader'
import RequestBanner from '../Article/ApprovedArticle/ApprovedArticleBanner'
import DatePosted from '../../common/DatePosted'
import { Badge, ActionIcon } from '../../common/ActionBadge'
import { PositiveRequestActionBadge } from '../../common/ActionButton'
import GreenArrow from '../../common/GreenArrow'

import type { ToggleModalPayload } from '../../../lib/Module'
import type { SubmitArticlePayload } from '../SubmitArticleForm/Module'
import type {
  FlagRequestPayload,
  AddRequestCommentPayload,
  AddToBountyPayload,
  RequestRefundPayload,
  ResubmitRequestPayload,
} from '../Requests/Module'

const web3 = new Web3()

const HeaderStrip = styled.div`
  display: flex;
  min-height: 76px;
  align-items: center;
  background-color: ${props => props.theme.secondaryColor};
  padding: 0 ${props => props.theme.padding};
  > div:last-child {
    margin-left: auto;
  }
`

const UserBadge = Badge.extend`
  margin-right: 0px;
  margin-left: 0px;
  > :first-child {
    font-size: 13px;
    font-weight: 500;
    line-height: 21px;
    text-transform: capitalize;
    margin-bottom: 0px;
  }
  > :last-child {
    text-transform: lowercase;
  }
`

const RequestOverflow = styled.div`
  overflow: hidden;
`

const actionBorderColor = css`
  border: 1px solid ${props => props.theme.primaryColor};
  &:hover {
    box-shadow: 0 0 0 2px ${props => props.theme.primaryColor};
  }
`

const ActionBadge = styled.div`
  display: flex;
  height: 40px;
  color: ${props => props.type === 'contribution' && 'white'};
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 0px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  border-radius: 4px;
  ${props => props.type === 'action' && actionBorderColor};
  > :first-child {
    padding-left: 10px;
    margin-right: 10px;
    font-size: 13px;
    font-weight: 500;
  }
  > :nth-child(2) {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    line-height: 1em;
  }
`

const BountyActions = styled.div`
  display: flex;
  flex-direction: row;
`

const GoBack = ({ routeChangeAction }: *) => (
  <ActionBadge type='contribution' onClick={() => routeChangeAction('back')}>
    <GreenArrow direction={'left'} />
    <span>Go Back</span>
  </ActionBadge>
)

const ContributeToBountyContainer = styled.div`
  margin: 0 auto;
  margin-left: 460px;
  align-self: center;
`

export const ContributeToBounty = ({ toggleBanner, type }: *) => (
  <ContributeToBountyContainer>
    <ActionBadge onClick={() => toggleBanner()} type='contribution'>
      <ActionIcon />
      <span>{type === 'article' ? 'Reward article creator' : 'Increase Reward'}</span>
    </ActionBadge>
  </ContributeToBountyContainer>
)

const TextBadge = ActionBadge.extend`
  cursor: inherit;
  color: white;
  > :first-child {
    font-size: 20px;
    margin-right: 0px;
  }
  > :nth-child(2) {
    font-size: 20px;
  }
  > span:first-child {
    font-weight: 300;
  }
`

const Bounty = ({ bounty }: *) => (
  <TextBadge>
    <strong>{web3.fromWei(bounty, 'ether')} ETH</strong>
  </TextBadge>
)

const UsdPrice = ({ bounty, ethUsdPrice }: *) => (
  <TextBadge>
    <span>{`$${((bounty && web3.fromWei(bounty, 'ether') * ethUsdPrice) || 0.0).toFixed(2)}`}</span>
  </TextBadge>
)

const AskAQuestion = styled(Button)`
  width: 100%;
  height: 39px !important;
  button,
  .ant-btn {
    height: 39px !important;
    transition: none !important;
  }
  transition: none !important;
  * {
    transition: none !important;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    color: ${props => props.theme.primaryTextColor};
  }
  :hover {
    border: none;
    box-shadow: 0 0 0 2px ${props => props.theme.primaryColor};
  }
`

const GeneralActions = BountyActions.extend`
  flex-direction: column;
  background-color: #ffffff;
  > * {
    margin-bottom: 10px;
  }
  > :last-child {
    margin-bottom: 0px;
  }
`

const RequestActionBadge = ({ label, action }: *) => (
  <ActionBadge type='action' onClick={action}>
    {/* <Icon type='trophy' /> */}
    <span>{label}</span>
  </ActionBadge>
)

const RequestHeader = styled.div`
  display: flex;
  height: 163px;
  background-color: ${props => (props.category ? props.theme[props.category].primaryColor : '')};
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const Logo = styled.img`
  max-height: 37.71px;
  max-width: 55px;
`

const RequestLogo = ({ category }) => (
  <Mask chosenCategory={category}>{!!category && <Logo src={`/static/images/${category}/avatar.png`} />}</Mask>
)

const RequestHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 19px;
`

const RequestCategory = styled.h3`
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  margin-top 6px;
`

const RequestSubject = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
`

const RequestDatesContainer = styled.div`
  display: flex;
  flex-direction: row;
  > :first-child {
    margin-right: 15px;
  }
  > *,
  * {
    font-size: 13px;
    color: white;
  }
  span {
    font-weight: 300;
  }
`

const RequestDates = ({ date_created, dead_line }) => (
  <RequestDatesContainer>
    <DatePosted>
      <span>POSTED</span>
      <strong>{moment(date_created).format('DD/MM/YYYY')}</strong>
    </DatePosted>
    <DatePosted>
      <span>EXPIRE{moment(dead_line).isBefore() ? 'D' : 'S'}</span>
      <strong>{`${moment(dead_line).fromNow()} ${moment(dead_line).format('(DD MMM YYYY)')}`}</strong>
    </DatePosted>
  </RequestDatesContainer>
)

const RequestContent = styled(Row)`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const RequestCategoryAndSubCategoryContainer = styled.div`
  display: flex;
  > :last-child {
    margin-left: 30px;
  }
`
const RequestSubcategory = RequestCategory

type Props = {
  userId: ?string,
  routeChangeAction: string => void,
  toggleModalAction: ToggleModalPayload => void,
  addToBountyAction: AddToBountyPayload => void,
  ethUsdPrice: number,
  flagRequestAction: FlagRequestPayload => void,
  addRequestCommentAction: AddRequestCommentPayload => void,
  data: {
    getRequest: RequestDTO,
    refetch: () => Promise<any>,
    loading: boolean,
    searchArticles?: { content: Array<ArticleDTO> },
  },
  submitArticleAction: SubmitArticlePayload => void,
  requestRefundAction: RequestRefundPayload => void,
  resubmitRequestAction: ResubmitRequestPayload => void,
}

type State = {
  askingQuestion: boolean,
  showBanner: boolean,
}

class Request extends Component<Props, State> {
  state = {
    askingQuestion: false,
    showBanner: false,
  }

  toggleBanner = (status?: boolean) =>
    typeof status === 'boolean'
      ? this.setState({ showBanner: status })
      : this.setState({ showBanner: !this.state.showBanner })

  render () {
    const {
      ethUsdPrice,
      routeChangeAction,
      flagRequestAction,
      addRequestCommentAction,
      addToBountyAction,
      submitArticleAction,
      userId,
      resubmitRequestAction,
    } = this.props
    const { getRequest, refetch, searchArticles } = this.props.data
    if (!getRequest) return <p>Request not found</p>

    const personalSubmittedArticle =
      searchArticles &&
      searchArticles.content.length > 0 &&
      typeof searchArticles.content.find(article => article.user_id === this.props.userId) === 'object' &&
      searchArticles.content.find(article => article.user_id === this.props.userId)

    const isCreator = getRequest && getRequest.user_id === userId

    return (
      <section>
        <HeaderStrip>
          <GoBack routeChangeAction={routeChangeAction} />
          {getRequest.status !== 'EXPIRED' &&
            getRequest.status !== 'CLOSED' && <ContributeToBounty type='request' toggleBanner={this.toggleBanner} />}
          <BountyActions>
            <Bounty bounty={getRequest.bounty} />
            <UsdPrice bounty={getRequest.bounty} ethUsdPrice={ethUsdPrice} />
            {/*
            <Rating />
            <VoteActions /> */}
          </BountyActions>
        </HeaderStrip>
        <RequestBanner
          type='request'
          showBanner={this.state.showBanner}
          ethUsdPrice={ethUsdPrice}
          addToBountyAction={addToBountyAction}
          toggleBanner={this.toggleBanner}
          request_id={getRequest.request_id}
        />
        <RequestHeader theme={theme} category={getRequest.category}>
          <RequestLogo category={getRequest.category} />
          <RequestHeaderContainer>
            <RequestCategoryAndSubCategoryContainer>
              <RequestCategory>{getRequest.category}</RequestCategory>
              <RequestSubcategory>{getRequest.sub_category}</RequestSubcategory>
            </RequestCategoryAndSubCategoryContainer>
            <RequestSubject>{getRequest.subject}</RequestSubject>
            <RequestDates date_created={getRequest.date_created} dead_line={getRequest.dead_line} />
          </RequestHeaderContainer>
          <CommentDetails
            comments={getRequest.comments.length}
            submissions={getRequest.total_submissions}
            inProgress={getRequest.total_flag}
          />
        </RequestHeader>
        <RequestOverflow>
          <RequestContent>
            <Col md={20}>
              <DescriptionRow requestPage fullText record={{ text: getRequest.text }} />
              <Divider />
              {Array.isArray(getRequest.comments) &&
                getRequest.comments.length > 0 &&
                getRequest.comments.map(({ comment, user_id, date_created, user }, index, comments) => (
                  <div key={date_created}>
                    <Comment
                      key={date_created}
                      user_id={user_id}
                      comment={comment}
                      user={user}
                      posted={moment(date_created).fromNow()}
                    />
                    <Divider />
                  </div>
                ))}
              {getRequest.status === 'OPENED' &&
                (this.state.askingQuestion ? (
                  <SubmitQuestion
                    addRequestCommentAction={addRequestCommentAction}
                    request_id={getRequest.request_id}
                    refetchRequest={refetch}
                    cancelAskingQuestion={() => this.setState({ askingQuestion: false })}
                  />
                ) : (
                  <AskAQuestion
                    onClick={() =>
                      this.setState({ askingQuestion: true }, () => {
                        const editorDOMNode = document.getElementById('editor')
                        if (editorDOMNode) {
                          editorDOMNode.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
                        }
                      })
                    }
                  >
                    Leave a comment
                  </AskAQuestion>
                ))}
            </Col>
            <Col md={4}>
              <GeneralActions>
                {getRequest.status === 'OPENED' &&
                  getRequest.user_id === userId &&
                  (typeof getRequest.total_submissions === 'number' && getRequest.total_submissions < 1) &&
                  (typeof getRequest.total_flag === 'number' && getRequest.total_flag < 1) && (
                    <RequestActionBadge
                      action={() => routeChangeAction(`/request/${getRequest.request_id}/update-request`)}
                      label='Update'
                    />
                  )}
                {getRequest.status !== 'CREATED' &&
                  getRequest.status !== 'EXPIRED' &&
                  getRequest.status !== 'CLOSED' &&
                  typeof getRequest.user_id === 'string' && (
                    <PositiveRequestActionBadge
                      alone
                      type={getRequest.is_flagged ? 'secondary' : 'primary'}
                      preIcon={getRequest.is_flagged ? '/static/images/icons/green-tick.png' : ''}
                      width='auto'
                      action={() => {
                        const flaggingPayload =
                          getRequest.is_flagged && typeof getRequest.request_id === 'string'
                            ? { request_id: getRequest.request_id, isFlagged: true }
                            : { request_id: getRequest.request_id }
                        flagRequestAction(flaggingPayload)
                      }}
                      label="I'm on it!"
                    />
                  )}
                {getRequest.status === 'CREATED' &&
                  isCreator && (
                    <PositiveRequestActionBadge
                      alone
                      type={'primary'}
                      width='100%'
                      action={() =>
                        resubmitRequestAction({
                          request_id: getRequest.request_id,
                          bounty: getRequest.bounty,
                          content_hash: getRequest.content_hash,
                          category: getRequest.category,
                          dead_line: getRequest.dead_line,
                        })
                      }
                      label='Resubmit Request'
                    />
                  )}
                {getRequest.status !== 'CREATED' &&
                  getRequest.status !== 'CLOSED' &&
                  getRequest.status !== 'EXPIRED' &&
                  (typeof personalSubmittedArticle === 'object' &&
                  personalSubmittedArticle.status !== 'SUBMISSION_IN_PROGRESS' ? (
                    <RequestActionBadge
                      action={() =>
                        routeChangeAction(
                          `/article/${personalSubmittedArticle.article_id}/article-version/${
                            personalSubmittedArticle.article_version
                          }`
                        )
                      }
                      label='View Article'
                    />
                  ) : (
                    <PositiveRequestActionBadge
                      alone
                      type={!getRequest.is_flagged ? 'secondary' : ''}
                      width='auto'
                      action={() =>
                        typeof personalSubmittedArticle === 'object' &&
                        personalSubmittedArticle.status === 'SUBMISSION_IN_PROGRESS'
                          ? submitArticleAction({
                            article_id: personalSubmittedArticle.article_id,
                            request_id: personalSubmittedArticle.request_id,
                            text: personalSubmittedArticle.text,
                            subject: personalSubmittedArticle.subject,
                            sub_category: personalSubmittedArticle.sub_category,
                          })
                          : routeChangeAction(`/request/${getRequest.request_id}/submit-article`)
                      }
                      label='Write Article'
                    />
                  ))}
                {getRequest.status === 'CLOSED' && (
                  <RequestActionBadge
                    action={() => {
                      const satisfyingArticle =
                        searchArticles.content &&
                        searchArticles.content.length > 0 &&
                        searchArticles.content.find(article => article.status === 'PUBLISHED')
                      routeChangeAction(
                        `/article/${satisfyingArticle.article_id}/article-version/${satisfyingArticle.article_version}`
                      )
                    }}
                    label='View Article'
                  />
                )}
                {getRequest.status === 'EXPIRED' &&
                  typeof getRequest.user_id === 'string' && (
                    <PositiveRequestActionBadge
                      alone
                      type={'primary'}
                      width='auto'
                      action={() => {
                        this.props.requestRefundAction({ request_id: getRequest.request_id })
                      }}
                      label='Refund funds'
                    />
                  )}
                <UserBadge>
                  <span>REQUESTED BY</span>
                  {/* <Link to=''> */}
                  <a>{getRequest && getRequest.user && getRequest.user.username}</a>
                  {/* </Link> */}
                </UserBadge>
              </GeneralActions>
            </Col>
          </RequestContent>
        </RequestOverflow>
      </section>
    )
  }
}

export default Request
