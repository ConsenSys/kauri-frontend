// @flow
import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'formik'
import { Helmet } from 'react-helmet'
import { menuHeaderHeight } from '../Navbar/View'
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton'
import Tabs from '../../../../kauri-components/components/Tabs'
import showFormValidationErrors from '../../../lib/show-form-validation-errors'

import type { RegisterActionPayload } from './Module'
import type { ShowNotificationPayload } from '../../../lib/Module'

const Container = styled.section`
  display: flex;
  min-height: calc(100vh - ${menuHeaderHeight}px);
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryTextColor};
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  > input {
    margin-top: ${props => `${props.theme.space[3]}px`};
    margin-bottom: ${props => `${props.theme.space[3]}px`};
  }
`

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  height: 39px;
  color: #fff;
  font-size: 12px !important;
  text-align: center !important;
  border: 1px solid #878787 !important;
  border-radius: 4px;
  *,
  > * {
    text-align: center !important;
    font-size: 12px !important;
    color: white;
  }
  :focus,
  :hover {
    border: 2px solid ${props => props.theme.primaryColor} !important;
  }
  ::-webkit-input-placeholder {
    color: #878787;
  }
  :focus::-webkit-input-placeholder {
    text-indent: -999px;
  }
  ::-moz-placeholder {
    color: #878787;
  }
  :focus::-moz-placeholder {
    text-indent: -999px;
  }
`

const InstallMetaMaskCTA = styled.span`
  color: #fff;
`

const Web3Unavailable = () => (
  <Container>
    <InstallMetaMaskCTA>
      {`To interact with Kauri, `}
      <a target='_blank' href='https://metamask.io/'>
        Get MetaMask
      </a>
    </InstallMetaMaskCTA>
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
    const { isSubmitting, validateForm, showNotificationAction } = this.props

    return (
      <StyledForm>
        <Field type='email' name='email' render={
          ({ field }) => <StyledInput {...field} type='text' placeholder='EMAIL' fontSize={5} />}
        />
        <PrimaryButton disabled={isSubmitting} type='submit' onClick={() => showFormValidationErrors(validateForm, showNotificationAction)}>
          {this.props.type === 'register' ? 'REGISTER' : 'LOGIN'}
        </PrimaryButton>
      </StyledForm>
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
    }
    return (
      <Container>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Tabs
          bg='transparent'
          padContent={false}
          minWidth={'350px'}
          centerTabs
          tabs={['LOGIN', 'REGISTER']}
          panels={[ <LoginForm {...this.props} />,
            <LoginForm {...this.props} type='register' /> ]} />
      </Container>
    )
  }
}

export default LoginFormContainer
