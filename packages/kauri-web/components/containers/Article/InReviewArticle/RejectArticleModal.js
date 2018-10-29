// @flow
import React from 'react'
import styled from 'styled-components'
import { NavigationText, BodyCard } from '../../../../../kauri-components/components/Typography'
import { PrimaryButton, TertiaryButton } from '../../../../../kauri-components/components/Button'
import ModalHeader from '../../../../../kauri-components/components/Headers/ModalHeader'
import Input from '../../../../../kauri-components/components/Input/Input';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`
const Title = ({ text }) => (
  <TitleContainer>
    <NavigationText>Reject Article</NavigationText>
    <BodyCard>{text}</BodyCard>
  </TitleContainer>
)

const ActionsContainer = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`

const CloseIcon = () => (
  <img style={{ rotate: '45deg' }} src='https://png.icons8.com/material-two-tone/50/000000/delete-sign.png' />
)

const Actions = ({ handleClose, handleConfirm, chosenArticles }) => (
  <ActionsContainer>
    <TertiaryButton icon={<CloseIcon />} onClick={() => handleClose()} color='textPrimary'>
      Close
    </TertiaryButton>
    <PrimaryButton
      onClick={() => {
        handleConfirm(chosenArticles)
        handleClose()
      }}
    >
      Confirm
    </PrimaryButton>
  </ActionsContainer>
)

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 600px;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`

type Props = {
  closeModalAction: () => void,
  confirmModal: (Array<{ id: string, version: string }>) => void,
}

type State = {
  chosenArticles: Array<{ id: string, version: string }>,
}

export default class ChooseArticleModal extends React.Component<Props, State> {
    state = {
        rejectionCause: "",
    }
  render () {
    const { closeModalAction, confirmModal } = this.props

    return (
      <ContentContainer>
        <ModalHeader
          actions={
            <Actions
              handleConfirm={() => confirmModal(this.state.rejectionCause)}
              handleClose={() => closeModalAction()}
            />
          }
          title={<Title text="Let the contributor know why the article is been rejected. So they can improve the content and submit a corrected version." />}
        />
       <Input onChange={e => this.setState({ rejectionCause: e.target.value})} value={this.state.rejectionCause} color="textPrimary" type='text' placeHolder='Add feedback for the contributor' fontSize={4} />
      </ContentContainer>
    )
  }
}
