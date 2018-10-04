// @flow
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import ModalHeader from '../components/Headers/ModalHeader';
import { PrimaryButton, TertiaryButton } from '../components/Button';
import { NavigationText, BodyCard } from '../components/Typography';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`
const Title = () =>
  <TitleContainer>
    <NavigationText>Your recent articles</NavigationText>
    <BodyCard>0 Selected</BodyCard>
  </TitleContainer>

const ActionsContainer = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const CloseIcon = () => <img style={{ rotate: '45deg' }} src='https://png.icons8.com/material-two-tone/50/000000/delete-sign.png' />

const Actions = () =>
  <ActionsContainer>
    <TertiaryButton icon={<CloseIcon />} onClick={() => alert('close')} color='textPrimary'>
      Close
    </TertiaryButton>
    <PrimaryButton onClick={() => alert('confirm')}>
      Confirm
    </PrimaryButton>
  </ActionsContainer>

storiesOf('Headers', module)
  .add('Modal', () => (
    <ModalHeader actions={<Actions />} title={<Title />} />
  ))
