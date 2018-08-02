// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import HomePageCollections from '../../connections/home-page/HomePageCollections.bs';
import HomePageArticles from '../../connections/home-page/HomePageArticles.bs';

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
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

class Homepage extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    return (
      <section>
        <Homepage.ContentContainer>
          <HomePageCollections routeChangeAction={this.props.routeChangeAction} />
          <HomePageArticles routeChangeAction={this.props.routeChangeAction} />
        </Homepage.ContentContainer>
      </section>
    )
  }
}

export default Homepage
