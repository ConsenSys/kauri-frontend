import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd'
import SubmittedArticles from '../../SubmittedArticles'
import OpenRequests from '../../OpenRequests'
import ProfileTab from './ProfileTab'
import { TabLabelContainer } from '../../../common/TabIcon'
import ExpiredRequests from '../../ExpiredRequests'
import FlaggedRequests from '../../FlaggedRequests'
import NetworkBanner from '../../StyledFooter/NetworkBanner'
import { Router } from '../../../../routes'

const TabPane = Tabs.TabPane

export const StyledTabs = styled(Tabs)`
  .ant-tabs-ink-bar,
  .ant-tabs-ink-bar-animated {
    display: none !important;
  }
  .ant-tabs-nav {
    display: flex;
    height: 60px;
    background-color: #0ba986;
    color: white;
    vertical-align: center;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin-left: ${({ theme }) => theme.padding} !important;
  }
  .ant-tabs-nav .ant-tabs-tab:nth-child(2) {
    padding-left: 0em !important;
  }
  .ant-tabs-nav .ant-tabs-tab:nth-child(3),
  .ant-tabs-nav .ant-tabs-tab:nth-child(4),
  .ant-tabs-nav .ant-tabs-tab:nth-child(5),
  .ant-tabs-nav .ant-tabs-tab:nth-child(6) {
    margin-left: 0em !important;
    padding-left: 0em !important;
  }
  .ant-tabs-nav .ant-tabs-tab:last-child {
    margin-right: calc(${({ theme }) => theme.padding} + 10px) !important;
    margin-left: auto !important;
  }

  .ant-tabs-tab-active,
  .ant-tabs-tab {
    border-bottom: none;
    font-weight: bold;
    font-size: 13px;
    color: white;
    line-height: 35px;
    text-transform: uppercase;
    margin: 0 30px 0 0 !important;
    padding: 12px 0px !important;
    &:hover {
      color: #ffffff;
    }
  }
  .ant-tabs-tab-active {
    span {
      border-bottom: 2px solid white;
      color: white;
    }
  }
  .ant-tabs-bar {
    margin-bottom: 0px;
  }
`

class TopicOwnerProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: this.props.defaultTab || 'profile',
      loggingOut: false,
    }
  }

  componentDidMount() {
    let setIntervalId
    const checkForSmartContractInitialisation = () => {
      console.log('checked')
      if (window.smartContracts && this.props.userId) {
        console.log('clearing')
        const { userId } = this.props
        this.props.fetchWalletAvailableFundsAction({ userId })
        clearInterval(setIntervalId)
      }
    }
    if (!window.smartContracts) {
      window.addEventListener('load', () => {
        if (typeof web3 !== 'undefined') {
          console.log('loaded')
          setIntervalId = setInterval(checkForSmartContractInitialisation, 250)
        }
      })
    } else {
      const { userId } = this.props
      this.props.fetchWalletAvailableFundsAction({ userId })
    }
  }

  onChange = activeKey => {
    Router.pushRoute(`/profile?tab=${activeKey}`)
    this.setState({ activeKey, loggingOut: true }, () => {
      if (activeKey === 'logout') this.logout()
    })
  }

  render() {
    return (
      <Fragment>
        <NetworkBanner key='network banner' tab='' type='profileTab' loggingOut={this.state.loggingOut} />
        <StyledTabs onChange={this.onChange} activeKey={this.state.activeKey}>
          <TabPane
            tab={
              <TabLabelContainer>
                <span>Profile</span>
              </TabLabelContainer>
            }
            key='profile'
          >
            <ProfileTab
              withdrawWalletAvailableFundsAction={this.props.withdrawWalletAvailableFundsAction}
              ethUsdPrice={this.props.ethUsdPrice}
              {...this.props.user}
            />
          </TabPane>
          <TabPane
            tab={
              <TabLabelContainer>
                <span>My Articles</span>
              </TabLabelContainer>
            }
            key='my articles'
          >
            <SubmittedArticles userId={this.props.user && this.props.user.address} />
          </TabPane>
          <TabPane
            tab={
              <TabLabelContainer>
                <span>My Requests</span>
              </TabLabelContainer>
            }
            key='my requests'
          >
            <OpenRequests profile userId={this.props.user && this.props.user.address} />
          </TabPane>
          <TabPane
            tab={
              <TabLabelContainer>
                <span>Expired Requests</span>
              </TabLabelContainer>
            }
            key='expired requests'
          >
            <ExpiredRequests />
          </TabPane>
          <TabPane
            tab={
              <TabLabelContainer>
                <span>Flagged Requests</span>
              </TabLabelContainer>
            }
            key='flagged requests'
          >
            <FlaggedRequests />
          </TabPane>
        </StyledTabs>
      </Fragment>
    )
  }
}

export default TopicOwnerProfile
