<<<<<<< HEAD
import React, { Component } from 'react';
import styled from 'styled-components';
import EditProfile from '../../common/EditProfile';
import { PrimaryButton, TertiaryButton } from '../../../../kauri-components/components/Button';
import Loading from '../../common/Loading';
import { Router } from '../../../routes';
=======
import React, { Component } from 'react'
import styled from 'styled-components'
import EditProfile from '../../common/EditProfile'
import { PrimaryButton, TertiaryButton } from '../../../../kauri-components/components/Button'
import Loading from '../../common/Loading'
>>>>>>> 52f66ff1ef79773705ed46200a2f7ac7b229e830

const Page = styled.div`
  display: flex;
  background: ${props => props.theme.bgPrimary};
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.space[3]}px;
  width: 300px;
  justify-content: space-between;
`

class OnboardingEditProfile extends Component {
  handleSubmit () {
    this.login
      .getWrappedInstance()
      .getWrappedInstance()
      .saveUser()
    this.redirect()
  }

  redirect () {
    if (this.props.query.r) {
      this.props.routeChangeAction('/' + this.props.query.r)
    } else {
      this.props.routeChangeAction(`/public-profile/${this.props.userId}`)
    }
  }

  componentDidMount () {
    const {
      name,
      username,
      email,
      avatar,
      social: { github, twitter },
      title,
      website,
    } = this.props.user
    const hasData = name || username || email || avatar || github || twitter || title || website
    if (hasData) {
      return this.redirect()
    }
  }

  render () {
    const {
      name,
      username,
      email,
      avatar,
      social: { github, twitter },
      title,
      website,
    } = this.props.user
    const hasData = name || username || email || avatar || github || twitter || title || website
    if (hasData) {
      return (
        <Page>
          <Loading />
        </Page>
      )
    }
    return (
      <Page>
        <Wrapper>
          <EditProfile ref={comp => (this.login = comp)} />
        </Wrapper>
        <ButtonWrapper>
          <TertiaryButton onClick={() => this.redirect()}>Skip</TertiaryButton>
          <PrimaryButton onClick={() => this.handleSubmit()}>Next</PrimaryButton>
        </ButtonWrapper>
      </Page>
    )
  }
}

export default OnboardingEditProfile
