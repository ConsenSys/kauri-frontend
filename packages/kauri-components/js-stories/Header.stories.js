// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import ModalHeader from '../components/Headers/ModalHeader'
import { PrimaryButton, SecondaryButton } from '../components/Button'

const ActionsContainer = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const TitleContainer = styled(ActionsContainer)`
  flex-direction: column;
`

const Actions = () =>
  <ActionsContainer>
    <SecondaryButton onClick={() => alert('close')} color='textPrimary'>
    Close
    </SecondaryButton>
    <PrimaryButton onClick={() => alert('confirm')}>
    Confirm
    </PrimaryButton>
  </ActionsContainer>

const Title = () =>
  <TitleContainer>
    <p>Your recent articles</p>
    <p>0 Selected</p>
  </TitleContainer>

storiesOf('Headers', module)
  .add('Modal', () => (
    <ModalHeader actions={<Actions />} title={<Title />} />
  ))
