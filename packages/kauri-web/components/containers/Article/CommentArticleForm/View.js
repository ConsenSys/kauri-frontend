// @flow
import React from 'react'
import styled from 'styled-components'
import SecondaryButton from '../../../../../kauri-components/components/Button/SecondaryButton'

import type { FormState } from './index'

const Section = styled.section`
  display: flex;
  width: 100%; 
`

const TextAreaContainer = styled.div``

const TextArea = styled.textarea`
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
  validateForm: () => Promise<any>
}

type State = {
  isAddingComment: boolean
}

export default class CommentArticleForm extends React.Component<Props, State> {
  state = {
    isAddingComment: false,
  }

  handleClick = () =>
    this.setState({ isAddingComment: true }, () => {
      const textareaDOMNode = document.getElementById('textarea')
      if (textareaDOMNode) {
        textareaDOMNode.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
      }
    })

  render () {
    const { isAddingComment } = this.state

    return (
      <Section>
        {
          isAddingComment
            ? (
              <TextAreaContainer id='textarea'>
                <TextArea />
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
