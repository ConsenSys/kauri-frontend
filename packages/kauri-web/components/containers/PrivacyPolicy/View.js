// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { ActionBadge } from '../../common/ActionBadge'
import GreenArrow from '../../common/GreenArrow'
import { Helmet } from "react-helmet";

const ActionsHeader = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 76px;
  padding: 36px ${props => props.theme.padding};
  background: ${props => props.theme.secondaryColor};
`

const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  width: 100%;
`

type Props = {
  routeChangeAction: string => void,
}

type State = {}

class PrivacyPolicy extends Component<Props, State> {
  render () {
    const { routeChangeAction } = this.props

    return (
      <section>
        <Helmet>
          <title>Beginner to Advanced Blockchain & Ethereum Tutorials | Privacy - Kauri</title>
          <meta
            name="description"
            content="Discover the best blockchain related articles, tutorials and how-to guides"
          />
          <link
            rel="canonical"
            href={`https://kauri.io/privacy-policy`}
          />
        </Helmet>
        <ActionsHeader>
          <ActionBadge onClick={() => routeChangeAction('back')}>
            <GreenArrow direction='left' />
            <span>Go Back</span>
          </ActionBadge>
        </ActionsHeader>
        <Content>
          <iframe
            style={{ minHeight: '85vh', width: '60%', border: 'none' }}
            src='https://docs.google.com/document/d/e/2PACX-1vQL9NX53wUMwWgiWQJnSuGne-gmKWb_dhauDt1au9rwsZfjnzeYFuO1ftfyZ28wSCGj10f-tWo3HJJ6/pub?embedded=true'
          />
        </Content>
      </section>
    )
  }
}

export default PrivacyPolicy
