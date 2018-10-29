// @flow
import React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { ContributeToBounty } from '../../Request/View'
import { ActionBadge } from '../../../common/ActionBadge'
import GreenArrow from '../../../common/GreenArrow'

const web3 = new Web3()

const ApprovedArticleActions = styled.section`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.secondaryColor};
  padding: 36px ${props => props.theme.padding};
  > :not(:first-child) {
    margin-left: auto;
  }
  @media (max-width: 500px) {
    padding: 36px 10px;
  }
`

const ArticleTipAmount = ActionBadge.extend`
  cursor: initial;
  :first-child {
    margin-right: 0px;
  }
`

const EthTipAmount = styled.h3`
  color: #ffffff;
  font-size: 20px !important;
  font-weight: bold;
  line-height: 26px;
`

const DollarTipAmount = EthTipAmount.extend`
  font-weight: 300;
`

export default ({ toggleBanner, routeChangeAction, tipArticleAction, ethUsdPrice, request_id, tip }: *) => (
  <ApprovedArticleActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction='left' />
      <span>Go Back</span>
    </ActionBadge>
    {/* <ContributeToBounty
      type='article'
      toggleBanner={toggleBanner}
      ethUsdPrice={ethUsdPrice}
      addToBountyAction={tipArticleAction}
      request_id={request_id}
    /> */}
    <ArticleTipAmount>
      <EthTipAmount>{`${web3.fromWei(tip || 0, 'ether')} ETH`}</EthTipAmount>
      <DollarTipAmount>{`$${(web3.fromWei(tip || 0, 'ether') * ethUsdPrice).toFixed(2)}`}</DollarTipAmount>
    </ArticleTipAmount>
  </ApprovedArticleActions>
)
