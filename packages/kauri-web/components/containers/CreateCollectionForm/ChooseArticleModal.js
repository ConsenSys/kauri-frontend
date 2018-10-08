// @flow
import React from 'react'
import styled from 'styled-components'
import R from 'ramda'
import { NavigationText, BodyCard } from '../../../../kauri-components/components/Typography'
import { PrimaryButton, TertiaryButton } from '../../../../kauri-components/components/Button'
import ChooseArticleContent from '../../../../kauri-components/components/Modal/ChooseArticleContent'
import ChooseArticleCard from '../../connections/ChooseArticleCard'
import ModalHeader from '../../../../kauri-components/components/Headers/ModalHeader'

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
    <BodyCard>1 Selected</BodyCard>
  </TitleContainer>

const ActionsContainer = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const CloseIcon = () => <img style={{ rotate: '45deg' }} src='https://png.icons8.com/material-two-tone/50/000000/delete-sign.png' />

const Actions = ({ handleClose }: { handleClose: () => void }) =>
  <ActionsContainer>
    <TertiaryButton icon={<CloseIcon />} onClick={() => handleClose()} color='textPrimary'>
      Close
    </TertiaryButton>
    <PrimaryButton onClick={() => alert('confirm')}>
      Confirm
    </PrimaryButton>
  </ActionsContainer>

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
  closeModalAction: () => void
}

type State = {
  chosenArticles: Array<{ id: string, version: string }>
}

export default class ChooseArticleModal extends React.Component<Props, State> {
  state = {
    chosenArticles: [],
  }

  chooseArticle = (chosenArticle: { id: string, version: string }) => this.setState({
    chosenArticles: R.union(this.state.chosenArticles, [chosenArticle]),
  })

  render () {
    const { closeModalAction } = this.props

    return <ContentContainer>
      <ModalHeader actions={<Actions handleClose={() => closeModalAction()} />} title={<Title />} />
      <ChooseArticleContent>
        <ChooseArticleCard />
      </ChooseArticleContent>
    </ContentContainer>
  }
}
