// @flow
import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { menuHeaderHeight } from '../Navbar/View'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import { Title2, BodyArticle, CTA } from '../../../../kauri-components/components/Typography';

import type { RegisterActionPayload } from './Module'
import type { ShowNotificationPayload } from '../../../lib/Module'

const Container = styled.section`
  display: flex;
  min-height: calc(100vh - ${menuHeaderHeight}px);
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryTextColor};
  color: white;
  flex-direction: column;
`

const LoginContainer = styled.div`
  height: ${props => props.height}px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100px;
  height: 91px;
  margin: ${props => props.theme.space[2]}px;
`;


const Web3Unavailable = () => (
  <Container>
    <LoginContainer height={300}>
      <Title2 color='white'>Web3 Sign in</Title2>
      <BodyArticle color='white'>You need the MetaMask extension to use Kauri. (MetaMask supports Chrome, Firefox, Opera)</BodyArticle>
      <Image src="/static/images/metamask/avatar.png" />
      <a href="https://metamask.io" target="_blank">https://metamask.io</a>
      <a href="https://metamask.io" target="_blank">
        <PrimaryButton bg="#F76C20" bgHover="#b24a11">
            GO TO METAMASK
        </PrimaryButton>
      </a>
    </LoginContainer>
  </Container>
)

class LoginForm extends React.Component<{
  handleSubmit: (SyntheticEvent<HTMLButtonElement>) => void,
  getFieldDecorator: any,
  type?: string,
}> {
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.handleSubmit(e)
    }
  }

  render () {
    const { isSubmitting } = this.props

    return (
      <Container>
        <LoginContainer height={160}>
          <Title2 color='white'>Web3 Sign in</Title2>
          <BodyArticle color='white'>Sign in using Web3 enabled browser.(MetaMask, Status, Brave)</BodyArticle>
          <PrimaryButton disabled={isSubmitting} type='submit' onClick={() => this.props.handleSubmit()}>SIGN IN</PrimaryButton>
        </LoginContainer>
      </Container>
    )
  }
}

type Props = {
  form: any,
  registerAction: (payload: RegisterActionPayload, callback: any) => void,
  showNotificationAction: ShowNotificationPayload => void,
}

class LoginFormContainer extends React.Component<Props> {
  render () {
    if (global.window && !global.window.web3) {
      return <Web3Unavailable />
    } else if (global.window && global.window.web3) {
      return (
        <Container>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <LoginForm {...this.props} type='register' />
        </Container>
      )
    } else {
      return null;
    }
  }
}

export default LoginFormContainer
