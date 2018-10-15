// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import Stack from 'stack-styled'
import styled from 'styled-components'
import { space } from 'styled-system'
import moment from 'moment'
import PrimaryHeaderSection from '../components/Section/PrimaryHeaderSection'
import ActionsSection from '../components/Section/ActionsSection'
import { AddTagButton, PrimaryButton, TertiaryButton } from '../components/Button'
import ProfileHeaderLabel from '../components/PublicProfile/ProfileHeaderLabel.bs'
import StatisticsContainer from '../components/PublicProfile/StatisticsContainer.bs'
import UserWidgetSmall from '../components/UserWidget/UserWidgetSmall.bs'
import CuratorHeaderLabel from '../components/Typography/CuratorHeaderLabel'
import Input from '../components/Input/Input'
import AddMemberButton from '../components/Button/AddMemberButton'
import ArticleCard from '../components/Card/ArticleCard'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

const CreateCollectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    ${space};
  }
`

const CreateCollectionActionsPlaceHolder = styled.div`
  display: flex;
  mix-blend-mode: normal;
  opacity: 0.2;
  cursor: initial !important;
  > * {
    ${space};
    cursor: initial !important;
  }
`

const CreateCollectionMetaDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    ${space};
  }
`

const CreateCollectionCuratorDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    ${space};
  }
`

const CreateCollectionCurators = styled.div`
  display: flex;
  align-items: center;
  > * {
    ${space};
  }
`

const CardContentSection = styled.section`
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0;
  max-width: 1280px;
  > * {
    margin: ${props => props.theme.space[2]}px;
  } 
`

storiesOf('Section', module)
  .add('ActionsSection', () => (
    <ActionsSection>
      <Stack alignItems={['', 'center']} >
        <TertiaryButton icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
      </Stack>
      <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
        <TertiaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Background Image</TertiaryButton>
      </Stack>
      <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
        <PrimaryButton>Create</PrimaryButton>
      </Stack>
    </ActionsSection>
  ))
  .add('PrimaryHeaderSection', () => (
    <PrimaryHeaderSection>
      <CreateCollectionDetails mb={2}>
        <ProfileHeaderLabel header='Collection' />
        <Input placeHolder='Add collection title' fontSize={5} value={'Collection Title inputted'} />
        <Input placeHolder='Add description' fontSize={3} />
        <AddTagButton color='white' />
        <CreateCollectionActionsPlaceHolder mr={3}>
          <PrimaryButton>Follow Collection</PrimaryButton>
          <TertiaryButton>Up vote</TertiaryButton>
          <TertiaryButton>Share</TertiaryButton>
        </CreateCollectionActionsPlaceHolder>
      </CreateCollectionDetails>
      <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
        <CreateCollectionMetaDetails mb={4}>
          <StatisticsContainer
            pageType='CollectionPage'
            statistics={
              [
                { 'name': 'Followers', 'count': 0 },
                { 'name': 'Articles', 'count': 0 },
                { 'name': 'Views', 'count': 0 },
                { 'name': 'Upvotes', 'count': 0 },
              ]
            }
          />
          <CreateCollectionCuratorDetails mb={2}>
            <CuratorHeaderLabel>Curator</CuratorHeaderLabel>
            <CreateCollectionCurators mr={3}>
              <UserWidgetSmall color='FFFFFF' username={'davodesign84'} />
              <AddMemberButton />
            </CreateCollectionCurators>
          </CreateCollectionCuratorDetails>
        </CreateCollectionMetaDetails>
      </Stack>
    </PrimaryHeaderSection>
  ))
  .add('CardContentSection', () => (
    <CardContentSection>
      <ArticleCard
        date={moment(1538734619928).format('D MMM YYYY')}
        title={'Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title Three Line Title'}
        id={'1234567890'}
        version={'1'}
        content={
          `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
        userId={'bfecec47dd8bf5f6264a9830a9d26ef387c38a67'}
        cardHeight={420}
        imageURL={'https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80'}
      />
    </CardContentSection>
  ))
