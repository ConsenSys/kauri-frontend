// @flow
import React, { Component } from 'react'
import { Tabs } from 'antd'
import { TopicHomeTabs as ApprovalsTabs } from '../TopicHome/View'
import { TabLabelContainer } from '../../common/TabIcon'
import ArticleRequests from './ArticleRequests'
import ApprovedArticles from './ApprovedArticles'
import PublishedArticleHistory from './PublishedArticleHistory'
import ArticlesWithoutRequests from './ArticlesWithoutRequests'
import { Router } from '../../../routes'

const TabPane = Tabs.TabPane

type Props = {
  defaultTab?: string,
  data: { searchArticles?: { totalElements: number } },
  startDriverStepsAction: ({ page: 'approvals' }) => void,
}

class Approvals extends Component<Props, { activeKey: string }> {
  constructor (props: Props) {
    super(props)
    this.state = {
      activeKey: typeof props.defaultTab === 'string' ? props.defaultTab : 'with request',
    }
  }

  componentDidMount () {
    this.props.startDriverStepsAction({
      page: 'approvals',
    })
  }

  onChange = (activeKey: string) => {
    Router.pushRoute(`/approvals?tab=${activeKey}`)
    this.setState({ activeKey })
  }

  render () {
    return (
      <ApprovalsTabs onChange={this.onChange} activeKey={this.state.activeKey}>
        <TabPane
          tab={
            <TabLabelContainer id='with-request'>
              <span>With Request</span>
            </TabLabelContainer>
          }
          key='with request'
        >
          <ArticleRequests />
        </TabPane>

        <TabPane
          tab={
            <TabLabelContainer id='without-request'>
              <span>Without Request</span>
            </TabLabelContainer>
          }
          key='without request'
        >
          <ArticlesWithoutRequests />
        </TabPane>

        <TabPane
          tab={
            <TabLabelContainer id='approved'>
              <span>Awaiting Publication</span>
            </TabLabelContainer>
          }
          key='approved'
        >
          <ApprovedArticles />
        </TabPane>

        <TabPane
          tab={
            <TabLabelContainer id='published-history'>
              <span>Published History</span>
            </TabLabelContainer>
          }
          key='published history'
        >
          <PublishedArticleHistory />
        </TabPane>

        <span
          tab={
            this.props.data &&
            this.props.data.searchArticles &&
            `${this.props.data.searchArticles.totalElements} Total Article${
              this.props.data.searchArticles.totalElements > 1 ? 's' : ''
            }`
          }
          key='total'
        />
      </ApprovalsTabs>
    )
  }
}

export default Approvals
