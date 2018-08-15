// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import CuratedList from './CuratedList'
import ArticleSearchbar from '../ArticleSearchbar'

type Props = {
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>,
    },
  },
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const HomePageHeader = styled.div`
  background-color: #1e2428;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`
const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: 32px;
  margin-top: 45px;
  margin-bottom: 12px;
`

class Homepage extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    if (!this.props.data || !this.props.data.getAllCuratedList) {
      return null
    } // TODO replace with an error message if exists

    const { getAllCuratedList } = this.props.data

    return (
      <ContentContainer>
        <HomePageHeader>
          <KauriTitle>Learn to build on Ethereum with Kauri</KauriTitle>
          <div>Articles, tutorials, Documentation and best practices</div>
          <ArticleSearchbar />
        </HomePageHeader>
        {getAllCuratedList.map(i => (
          <CuratedList routeChangeAction={this.props.routeChangeAction} key={i.id} content={i} />
        ))}
      </ContentContainer>
    )
  }
}

export default Homepage
