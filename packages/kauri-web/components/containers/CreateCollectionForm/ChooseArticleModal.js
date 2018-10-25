// @flow
import React from 'react'
import styled from 'styled-components'
import R from 'ramda'
import { NavigationText, BodyCard } from '../../../../kauri-components/components/Typography'
import { PrimaryButton, TertiaryButton } from '../../../../kauri-components/components/Button'
import ChooseArticleCard, { articleSize } from '../../connections/ChooseArticleCard'
import ModalHeader from '../../../../kauri-components/components/Headers/ModalHeader'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`
const Title = ({ chosenArticles }) => (
  <TitleContainer>
    <NavigationText>{`${articleSize} Most Recent articles`}</NavigationText>
    <BodyCard>{`${Array.isArray(chosenArticles) ? chosenArticles.length : 0} Selected`}</BodyCard>
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
  height: 620px;
  width: 980px;
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
  constructor (props) {
    super(props)
    this.state = {
      chosenArticles: this.props.chosenArticles || [],
    }
  }

  chooseArticle = (chosenArticle: { id: string, version: string }) =>
    this.setState({
      chosenArticles: R.find(({ id, version }) => chosenArticle.id === id && chosenArticle.version === version)(
        this.state.chosenArticles
      )
        ? R.reduce((current, next) => {
          if (next.id === chosenArticle.id && next.version === chosenArticle.version) {
            return current
          } else {
            current.push(next)
            return current
          }
        }, [])(this.state.chosenArticles)
        : R.union(this.state.chosenArticles, [chosenArticle]),
    })

  render () {
    const { closeModalAction, confirmModal } = this.props

    return (
      <ContentContainer>
        {/* {JSON.stringify(this.state)} */}
        <ModalHeader
          actions={
            <Actions
              chosenArticles={this.state.chosenArticles}
              handleConfirm={confirmModal}
              handleClose={() => closeModalAction()}
            />
          }
          title={<Title chosenArticles={this.state.chosenArticles} />}
        />
        <ChooseArticleCard chosenArticles={this.state.chosenArticles} chooseArticle={this.chooseArticle} />
      </ContentContainer>
    )
  }
}
