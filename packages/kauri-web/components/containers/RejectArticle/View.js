// @flow
import React from 'react'
import styled from 'styled-components'
import { ActionButtons, ActionButton, PositiveRequestActionBadge } from '../../common/ActionButton'
import { ArticleApprovedConfirmationLogoBadge } from '../../common/ActionBadge'
import { Input } from 'antd'
import {
  Container as RequestCreatedContainer,
  ConfirmationSubject as RequestConfirmationSubject,
} from '../RequestCreated/View'
import type { RejectArticlePayload } from '../Article/Module'

const { TextArea } = Input

type Props = {
  data?: { getArticle?: ArticleDTO },
  routeChangeAction: string => void,
  rejectArticleAction: RejectArticlePayload => void,
}

const ConfirmationSubject = RequestConfirmationSubject.extend`
  font-size: 16px;
  margin-bottom: 50px;
`

const Container = RequestCreatedContainer.extend`
  > :first-child {
    margin-bottom: 7px;
  }
`

const ArticleApprovedActionButtons = ActionButtons.extend`
  > :first-child {
    margin-right: 0px;
  }
`

const LeaveFeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 340px;
`

const LeaveFeedbackLabel = styled.span`
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 5px;
`

const LeaveFeedbackTextArea = styled(TextArea)`
  margin-bottom: 30px;
`

class RejectArticle extends React.Component<Props, { feedback: string }> {
  state = { feedback: '' }

  handleSubmit = () =>
    typeof this.props.data === 'object' &&
    typeof this.props.data.getArticle === 'object' &&
    typeof this.props.data.getArticle.article_id === 'string' &&
    this.props.rejectArticleAction({
      article_id: this.props.data.getArticle.article_id,
      article_version: this.props.data.getArticle.article_version,
      rejection_cause: this.state.feedback,
    })

  handleChange = (event: { target: { value: string } }) => this.setState({ feedback: event.target.value })

  render () {
    const { data, routeChangeAction } = this.props
    return (
      <Container>
        <ArticleApprovedConfirmationLogoBadge
          chosenCategory={data.getArticle.category}
          confirmationMessage={'Reject Article'}
        />
        <ConfirmationSubject>{data.getArticle.subject}</ConfirmationSubject>
        <LeaveFeedbackContainer>
          <LeaveFeedbackLabel>LEAVE FEEDBACK</LeaveFeedbackLabel>
          <LeaveFeedbackTextArea autoFocus value={this.state.feedback} onChange={this.handleChange} rows={6} />
        </LeaveFeedbackContainer>
        <ArticleApprovedActionButtons>
          <PositiveRequestActionBadge
            type='primary'
            label='Yes'
            action={() => this.handleSubmit()}
            height={40}
            width={183}
          />
          <ActionButton action={() => routeChangeAction('back')} height={40} width={183} label={'Cancel'} type='alt' />
        </ArticleApprovedActionButtons>
      </Container>
    )
  }
}

export default RejectArticle
