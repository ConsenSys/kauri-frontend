import React from 'react'
import styled, { css } from 'styled-components'
import { InputNumber, DatePicker } from 'antd'
import moment from 'moment'
import SharedEditor from '../../common/SharedEditor'
import { Badge } from '../../common/ActionBadge'
import theme from '../../../lib/theme-config'
import Web3 from 'web3'

const web3 = new Web3()

const dateFormat = 'YYYY/MM/DD'

function disabledDate (current) {
  // Can not select days before 3 days time and past 30 days time
  return (current && current < moment().add(2, 'days')) || current > moment().add(30, 'days')
}

const displayNoneCss = css`
  display: none;
`

const RandomLineThatGoesAcrossTheContent = styled.div`
  width: 100%;
  height: 48px;
  left: 0;
  position: absolute;
  border-bottom: 1px solid #c8ccd0;
`

export const CreateRequestContent = styled.div`
  display: flex;
  padding: 0 ${props => props.theme.padding};
  min-height: 70vh;
`

const DollarAmount = styled.span`
  margin-left: 10px;
  color: ${props => props.theme.secondaryTextColor} !important;
`

export const CreateRequestLabel = styled.span`
  height: 16px;

  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  color: ${props => props.theme.primaryColor};
  text-transform: uppercase;
`

const inReviewArticleContainerCss = css`
  display: flex;
  padding-top: 2.5em;
  flex-direction: column;
`

const approvedArticleContainerCss = css`
  padding-top: 2.5em;
`

export const CreateRequestContainer = styled.div`
  width: 74%;
  ${props => props.type === 'in review article' && inReviewArticleContainerCss};
  ${props => props.type === 'approved article' && approvedArticleContainerCss};
`

const isSubmittingOutlineHeaderCss = css`
  padding-top: 4em;
`

const outlineHeaderCss = css`
  position: sticky;
  top: 30px;
  max-height: 90vh;
  > :nth-child(3) {
    margin-top: 0px;
    overflow: auto;
    max-height: 100vh;
  }
  ${props => props.isSubmitting && isSubmittingOutlineHeaderCss};
`

export const CreateRequestDetails = styled.section`
  display: flex;
  width: 26%;
  padding-left: 30px;
  flex-direction: column;
  align-items: center;
  > :last-child {
    margin-top: 15px;
  }
  padding-top: 2.5em;
  ${props => props.type === 'outline' && outlineHeaderCss};
  padding-left: ${props => props.type === 'createRequest' && '110px'};
  padding-top: ${props => props.type === 'createRequest' && '4em'};
`

const DetailBadge = Badge.extend`
  width: 100%;
  margin-right: 0px;
  > * {
    color: ${props => props.theme.primaryTextColor};
  }
  ${props => props.request && displayNoneCss};
`

const Bounty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  > * {
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    color: ${props => props.theme.primaryColor};
  }
`

export const DetailLabel = styled.span`
  color: ${props => props.theme.primaryTextColor};
  line-height: 18px;
  font-weight: 500;
  font-style: normal;
  font-size: 12px;
  text-transform: uppercase;
`

class CreateRequestText extends React.Component {
  render () {
    const { getFieldDecorator, editorState, handleChange, request, getFieldError } = this.props
    return getFieldDecorator('text', {
      rules: [
        {
          required: true,
          message: 'Please input the description of the request!',
          whitespace: true,
        },
      ],
      initialValue: request && request.text,
      defaultValue: request && request.text,
    })(<SharedEditor hasErrors={getFieldError('text')} editorState={editorState} handleChange={handleChange} />)
  }
}

const BountyInputNumber = styled(InputNumber)`
  .ant-input-number-input-wrap {
    height: 40px;
    > input {
      height: 35px;
    }
  }
  .ant-input-number-handler-down {
    border-top: 1px solid #2a3b3b;
  }
  .ant-input-number-handler-wrap {
    border-left: 1px solid #2a3b3b;
  }
`

const BountyInput = ({ getFieldDecorator, ethUsdPrice, request }) =>
  getFieldDecorator('bounty', {
    rules: [
      {
        required: true,
        message: 'Please input the bounty of the request!',
      },
    ],
    initialValue: parseInt(request && web3.fromWei(request.bounty, 'ether')) || 0.0,
    defaultValue: parseInt(request && web3.fromWei(request.bounty, 'ether')) || 0.0,
  })(
    <BountyInputNumber
      style={{
        border: `1px solid ${theme.primaryColor}`,
        borderRadius: 4,
        width: 105,
        height: 40,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: `${theme.primaryTextColor} !important`,
      }}
      min={0}
      step={0.01}
      precision={2}
      formatter={value => `${value}`}
      parser={value => {
        return value.replace(/[^0-9^.]/g, '')
      }}
    />
  )

const DeadlineDatePicker = styled(DatePicker)`
  height: 40px;
  input {
    height: 40px;
  }
`

const RequestDeadline = ({ getFieldDecorator, setFieldsValue, request }) =>
  getFieldDecorator('dead_line', {
    rules: [
      {
        required: true,
        message: 'Please input the deadline date of the request!',
      },
    ],
    initialValue: (request && moment(request.dead_line)) || moment().add(4, 'days'),
    defaultvalue: (request && moment(request.dead_line)) || moment().add(4, 'days'),
  })(<DeadlineDatePicker disabledDate={disabledDate} format={dateFormat} />)

export default class extends React.Component {
  state = {
    focused: false,
  }
  render () {
    const {
      getFieldDecorator,
      editorState,
      handleChange,
      ethUsdPrice,
      setFieldsValue,
      getFieldValue,
      getFieldError,
    } = this.props
    const request = this.props.data && this.props.data.getRequest

    return (
      <CreateRequestContent>
        <CreateRequestContainer onClick={() => this.setState({ focused: true })}>
          <RandomLineThatGoesAcrossTheContent />
          <CreateRequestText
            request={request}
            editorState={editorState}
            getFieldDecorator={getFieldDecorator}
            getFieldError={getFieldError}
            handleChange={handleChange}
          />
        </CreateRequestContainer>
        <CreateRequestDetails type='createRequest'>
          <DetailBadge request={!!request}>
            <Bounty>
              <BountyInput request={request} ethUsdPrice={ethUsdPrice} getFieldDecorator={getFieldDecorator} />
              <DollarAmount>{`ETH ($${(
                (getFieldValue('bounty') && parseFloat(getFieldValue('bounty')) * parseFloat(ethUsdPrice)) ||
                0.0
              ).toFixed(2)})`}</DollarAmount>
            </Bounty>
            <DetailLabel>Bounty Amount</DetailLabel>
          </DetailBadge>
          <DetailBadge request={!!request}>
            <RequestDeadline request={request} getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} />
            <DetailLabel>Deadline (30 days max)</DetailLabel>
          </DetailBadge>
        </CreateRequestDetails>
      </CreateRequestContent>
    )
  }
}
