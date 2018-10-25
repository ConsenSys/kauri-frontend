// @flow
import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'formik'
import { PrimaryButton, SecondaryButton } from '../../../../../kauri-components/components/Button'
import { BodyCardCss } from '../../../../../kauri-components/components/Typography'
import showFormValidationErrors from '../../../../lib/show-form-validation-errors'
import { routeChangeAction } from '../../../../lib/Module';

 import{ FormState } from './index'

const Section = styled.section`
  display: flex;
  width: 100%; 
`

const TextAreaContainer = styled(Form)`
  width: 100%;
`

const TextArea = styled.textarea`
  outline: none;
  resize: none;
  border: 1px solid ${props => props.theme.colors['borderTextArea']};
  border-radius: 4px;
  width: 100%;
  ${BodyCardCss};
`

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${props => props.theme.space[2]}px;
  justify-content: flex-end;
  > button {
    :first-child {
      margin-right: ${props => props.theme.space[2]}px;
    }
  }
`

type Props = {
  userId?: string,
  username?: ?string,
  id: string,
  version: string,
  touched: {
    name: boolean,
    description: boolean
  },
  errors: {
    name: ?string,
    description: ?string
  },
  values: FormState,
  isSubmitting: boolean,
  setFieldValue: (string, any) => void,
  validateForm: () => Promise<any>,
  showNotificationAction: ({ notificationType: string, message: string, description: string }) => void,
}

type State = {
  isAddingComment: boolean
}

export default class CommentArticleForm extends React.Component<Props, State> {
  state = {
    isAddingComment: false,
  }

  handleClick = () => {
    if (!this.props.userId) {
      this.props.routeChangeAction(`/login?r=${this.props.router.asPath.substring(1)}`);
    } else {
      this.setState({ isAddingComment: true }, () => {
        const textareaDOMNode = document.getElementById('textarea')
        if (textareaDOMNode) {
          textareaDOMNode.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
        }
      })
    }
  }

  render () {
    const { showNotificationAction, validateForm, isSubmitting } = this.props
    const { isAddingComment } = this.state

    return (
      <Section>
        {
          isAddingComment
            ? (
              <TextAreaContainer id='textarea'>
                <Field name='body' render={
                  ({ field }) =>
                    <TextArea
                      {...field}
                      placeholder={'Enter your comment here!'}
                      rows={6}
                    />
                }
                />
                <ButtonsContainer>
                  <SecondaryButton disabled={isSubmitting} color='textPrimary' border={'primary'} onClick={() => this.setState({ isAddingComment: false })}>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    disabled={isSubmitting}
                    onClick={() => {
                      showFormValidationErrors(validateForm, showNotificationAction, () => this.setState({ isAddingComment: false }))
                    }}
                    type='submit'>
                    Submit
                  </PrimaryButton>
                </ButtonsContainer>
              </TextAreaContainer>
            )
            : (
              <SecondaryButton width='100%' handleClick={this.handleClick} color='textPrimary' border={'primary'} borderHover={'hoverTextColor'}>
                Leave a comment
              </SecondaryButton>
            )
        }
      </Section>
    )
  }
}
