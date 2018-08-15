// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import TopicsHeader from './TopicsHeader'
import Topic from './Topic'

type Props = {
  categories: Array<string>,
}

const Content = styled.section`
  > :nth-child(even) {
    background-color: ${props => props.theme.tertiaryBackgroundColor};
  }
`

class Topics extends Component<Props> {
  static Header = TopicsHeader
  static Topic = Topic
  static Content = Content

  render () {
    return (
      <section>
        <Topics.Header />
        <Topics.Content>
          {this.props.categories.filter(category => category !== 'kauri').map((category, i) => (
            <Topic key={category + i} category={category} />
          ))}
        </Topics.Content>
      </section>
    )
  }
}

export default Topics
