// @flow
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from '../../../routes'
import RecentRequest from './RecentRequest'
import { Divider } from 'antd'

type Props = {
  category?: string,
  ethUsdPrice: number,
  data: {
    loading: boolean,
    searchRequests?: { content: Array<?RequestDTO>, totalElements: number },
  },
  recentCategoryRequests?: boolean,
}

const Icon = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColor};
`

const ViewAll = styled.a`
  margin-left: auto;
  color: ${props => props.theme.primaryColor};
  font-size: 13px;
  font-weight: bold;
  line-height: 18px;
  text-transform: uppercase;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
`

const Title = styled.h4`
  margin-bottom: 0px;
  margin-left: 9px;
  color: ${props => props.theme.primaryTextColor};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`

const Header = ({ category }: { category?: string }) => (
  <HeaderContainer>
    <Icon category={category} />
    <Title>Recent Requests</Title>
    <Link route={typeof category !== 'string' ? '/requests' : `/requests?category=${category}`}>
      <ViewAll href={typeof category !== 'string' ? '/requests' : `/requests?category=${category}`}>View All</ViewAll>
    </Link>
  </HeaderContainer>
)

const Container = styled.section`
  padding-left: 25px;
`

const RecentRequestsContainer = styled.section`
  > div {
    margin-top: 20px;
  }
`

const AllArticlesContainer = styled.div`
  min-height: 112px;
  width: 100%;
  padding: 14px 18px;
  background-color: #0ba986;
  border-radius: 4px;
  cursor: pointer;
`

const Counter = styled.h2`
  color: #ffffff;
  font-size: 40px;
  font-weight: 300;
  line-height: 53px;
  margin-bottom: 0px;
`

const Label = styled.strong`
  color: #ffffff;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  text-transform: capitalize;
`

const AllArticlesBadge = ({ count, category, recentCategoryRequests }: *) => (
  <Link route={`/requests${category ? `?category=${category}` : ''}`}>
    <AllArticlesContainer>
      <Counter>{count}</Counter>
      <Label>{recentCategoryRequests ? 'Article Requests' : `Article Requests for ${category}`}</Label>
    </AllArticlesContainer>
  </Link>
)

class RecentRequests extends Component<Props> {
  render () {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }

    return (
      <Container>
        {this.props.data.searchRequests.content.length > 0 && (
          <Fragment>
            <Header category={this.props.category} />
            <RecentRequestsContainer>
              {typeof this.props.data.searchRequests === 'object' &&
              Array.isArray(this.props.data.searchRequests.content) &&
              this.props.data.searchRequests.content.length > 0 ? (
                  this.props.data.searchRequests.content.map(
                    (request, index, requests) =>
                      index !== requests.length - 1 ? (
                        <Fragment key={request.request_id}>
                          <RecentRequest {...request} ethUsdPrice={this.props.ethUsdPrice} />
                          <Divider style={{ marginTop: '20px' }} />
                        </Fragment>
                      ) : (
                        <RecentRequest key={request.request_id} {...request} ethUsdPrice={this.props.ethUsdPrice} />
                      )
                  )
                ) : (
                  <p>No recent requests.</p>
                )}
            </RecentRequestsContainer>
          </Fragment>
        )}
        {!this.props.recentCategoryRequests && (
          <Fragment>
            {this.props.data.searchRequests.content.length > 0 && <Divider style={{ marginTop: '20px' }} />}
            <AllArticlesBadge category={this.props.category} count={this.props.data.searchRequests.totalElements} />
          </Fragment>
        )}
        {this.props.recentCategoryRequests && (
          <Fragment>
            {this.props.data.searchRequests.content.length > 0 && <Divider style={{ marginTop: '20px' }} />}
            <AllArticlesBadge
              recentCategoryRequests
              category={this.props.category}
              count={this.props.data.searchRequests.totalElements}
            />
          </Fragment>
        )}
      </Container>
    )
  }
}

export default RecentRequests
