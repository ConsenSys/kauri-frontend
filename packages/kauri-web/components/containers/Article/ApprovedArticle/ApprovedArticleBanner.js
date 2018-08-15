// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { InputNumber, Button } from 'antd'
import theme from '../../../../lib/theme-config'
import NetworkBanner from '../../StyledFooter/NetworkBanner'

import type { TipArticlePayload } from '../Module'
import type { AddToBountyPayload } from '../../Requests/Module'

const slideBannerCss = css`
  overflow-y: hidden;
  max-height: ${props => (props.showBanner ? '100px' : '0px')};
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
`

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  align-items: center;
  ${slideBannerCss};
`

const BountyContainer = styled.div`
  display: flex;
`
const ContributionsNotice = styled.div`
  margin-top: 10px;
  > span {
    font-weight: 200;
    font-size: 14px;
    color: ${props => props.theme.secondaryColor};
  }
`

const ContributeButton = styled(Button)`
  width: 150px;
  height: 40px !important;
  margin-left: 20px;
  border-radius: 4px;
  font-size: 12px !important;
  font-weight: bold !important;
  line-height: 16px !important;
  text-transform: uppercase;
  color: #fff !important;
  background-color: ${props => props.theme.primaryColor} !important;
  border: 1px solid ${props => props.theme.primaryColor} !important;
  button,
  .ant-btn {
    height: 40px !important;
    background-color: ${props => props.theme.primaryColor} !important;
    color: #ffffff !important;
  }
  :hover {
    background-color: ${props => props.theme.hoverTextColor} !important;
    border: 1px solid ${props => props.theme.hoverTextColor} !important;
  }
`

const BountyInputNumber = styled(InputNumber)`
  .ant-input-number-handler-down {
    border-top: 1px solid #2a3b3b;
  }
  .ant-input-number-handler-wrap {
    border-left: 1px solid #2a3b3b;
  }
`

const CancelButton = ContributeButton.extend`
  margin-left: 30px;
  background-color: #fff !important;
  border: 1px solid ${props => props.theme.primaryColor} !important;
  color: ${props => props.theme.secondaryTextColor} !important;
  :hover {
    border: none;
    background: #fff !important;
    box-shadow: 0 0 0 2px ${props => props.theme.hoverTextColor} !important;
  }
`

type Props = {
  toggleBanner: *,
  type: 'article' | 'request',
  ethUsdPrice: number,
  showBanner: boolean,
  tipArticleAction?: (payload: TipArticlePayload, callback: any) => void,
  addToBountyAction?: (payload: AddToBountyPayload, callback: any) => void,
  request_id?: ?string,
  article_id?: string,
  user_id?: string,
}

const BountyInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  > :first-child {
    margin-right: 10px;
  }
  align-items: center;
  .ant-input-number-input-wrap {
    height: 100%;
    > input {
      height: 100%;
    }
  }
`

const DollarAmount = styled.span`
  color: ${props => props.theme.secondaryTextColor} !important;
  height: 25px;
`

export default class ApprovedArticleBanner extends React.Component<Props, { bounty: number }> {
  state = {
    bounty: 0,
  }

  componentWillUnmount () {
    this.props.toggleBanner(false)
  }

  render () {
    const {
      toggleBanner,
      showBanner,
      type,
      ethUsdPrice,
      tipArticleAction,
      addToBountyAction,
      request_id,
      article_id,
      user_id,
      article_version,
    } = this.props
    const { bounty } = this.state
    return (
      <Banner showBanner={showBanner}>
        <NetworkBanner type='rewardContributor' showBanner={showBanner} />
        <BountyContainer>
          <BountyInputContainer>
            <BountyInputNumber
              style={{
                border: `1px solid #2A3B3B`,
                borderRadius: 4,
                width: 90,
                height: 40,
                lineHeight: 40,
                textAlign: 'center',
                color: `${theme.primaryTextColor} !important`,
              }}
              precision={2}
              min={0.0}
              step={0.01}
              defaultValue={0.0}
              formatter={value => `${value}`}
              parser={(value: string) => {
                return value.replace(/[^0-9^.]/g, '')
              }}
              onChange={bounty => this.setState({ bounty })}
            />
            <DollarAmount>{`ETH ($${(
              (this.state.bounty && parseFloat(this.state.bounty) * parseFloat(ethUsdPrice)) ||
              0.0
            ).toFixed(2)})`}</DollarAmount>
          </BountyInputContainer>
          <ContributeButton
            onClick={() => {
              type === 'article'
                ? tipArticleAction({ article_id, article_version, request_id, user_id, bounty }, toggleBanner)
                : addToBountyAction({ request_id, bounty }, toggleBanner)
            }}
          >
            Contribute
          </ContributeButton>
          <CancelButton onClick={() => this.props.toggleBanner(false)}>Cancel</CancelButton>
        </BountyContainer>
        <ContributionsNotice>
          <span>All contributions go towards the creator</span>
        </ContributionsNotice>
      </Banner>
    )
  }
}
