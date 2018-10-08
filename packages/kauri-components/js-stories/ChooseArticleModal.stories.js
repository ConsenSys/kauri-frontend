// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import moment from 'moment'
import ArticleCard from '../components/Card/ArticleCard'
import configureStore from 'redux-mock-store'
import Modal from '../components/Modal'
import ChooseArticleContent from '../components/Modal/ChooseArticleContent'
import ModalHeader from '../components/Headers/ModalHeader'
import { PrimaryButton, TertiaryButton } from '../components/Button'
import { NavigationText, BodyCard } from '../components/Typography'

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

const Actions = () =>
  <ActionsContainer>
    <TertiaryButton icon={<CloseIcon />} onClick={() => alert('close')} color='textPrimary'>
      Close
    </TertiaryButton>
    <PrimaryButton onClick={() => alert('confirm')}>
      Confirm
    </PrimaryButton>
  </ActionsContainer>

const mockStore = configureStore();

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 620px;
  width: 980px;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`

const ModalChildren = () =>
  <ContentContainer>
    <ModalHeader actions={<Actions />} title={<Title />} />
    <ChooseArticleContent>
      <ArticleCard
        date={moment(1538734619928).format('D MMM YYYY')}
        title={'Two Line Title Two Line Title Two Line Title Two Line Title'}
        id={'1234567890'}
        version={'1'}
        content={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Praesent sed cursus purus.
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit…
      `
        }
        username={'USERNAME GOES HERE'}
        userId={'HEY'}
        cardHeight={420}
        imageURL={'https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80'}
        hoverAction={({ id, version }) => alert('hover action', id)}
        viewAction={({ id, version }) => alert('view action', id)}
      />
      <ArticleCard
        date={moment(1538734619928).format('D MMM YYYY')}
        title={'Two Line Title Two Line Title Two Line Title Two Line Title'}
        id={'1234567890'}
        version={'1'}
        content={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Praesent sed cursus purus.
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit…
      `
        }
        username={'USERNAME GOES HERE'}
        userId={'HEY'}
        cardHeight={420}
        imageURL={'https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80'}
        hoverAction={({ id, version }) => alert('hover action', id)}
        viewAction={({ id, version }) => alert('view action', id)}
        isChosenArticle
      />
      <ArticleCard
        date={moment(1538734619928).format('D MMM YYYY')}
        title={'Two Line Title Two Line Title Two Line Title Two Line Title'}
        id={'1234567890'}
        version={'1'}
        content={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Praesent sed cursus purus.
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit…
      `
        }
        username={'USERNAME GOES HERE'}
        userId={'HEY'}
        cardHeight={420}
        hoverAction={({ id, version }) => alert('hover action', id)}
        viewAction={({ id, version }) => alert('view action', id)}
      />
      <ArticleCard
        date={moment(1538734619928).format('D MMM YYYY')}
        title={'Two Line Title Two Line Title Two Line Title Two Line Title'}
        id={'1234567890'}
        version={'1'}
        content={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Praesent sed cursus purus.
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit…
      `
        }
        username={'USERNAME GOES HERE'}
        userId={'HEY'}
        cardHeight={420}
        hoverAction={({ id, version }) => alert('hover action', id)}
        viewAction={({ id, version }) => alert('view action', id)}
      />
    </ChooseArticleContent>
  </ContentContainer>

storiesOf('Modal', module)
  .addDecorator(getStory => <Provider store={mockStore({
    modal: {
      isModalOpen: true,
      children: <ModalChildren />,
    },
  })}>{getStory()}</Provider>)
  .add('Choose Article Modal opened', () => (
    <Modal />
  ))
